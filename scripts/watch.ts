import { exec, spawn } from 'child_process';
import 'reflect-metadata';
import * as ts from 'typescript';
import { promisify } from 'util';
import { addErrorMap, addReflectErrorForClass, addReflectMetadataImport } from './transformer';

const execAsync = promisify(exec);

function createWatchAndRun() {
    const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
    if (!configPath) throw new Error('Could not find tsconfig.json');

    const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

    const host = ts.createWatchCompilerHost(
        configPath,
        {}, // compilerOptions override
        ts.sys,
        createProgram,
        diagnostic => {
            console.error(ts.formatDiagnosticsWithColorAndContext([diagnostic], {
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getCanonicalFileName: f => f,
                getNewLine: () => '\n',
            }));
        },
        diagnostic => {
            console.info(ts.formatDiagnosticsWithColorAndContext([diagnostic], {
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getCanonicalFileName: f => f,
                getNewLine: () => '\n',
            }));
        }
    );

    // Store the child process to manage running instance
    let runningProcess: ReturnType<typeof spawn> | null = null;

    // Override afterProgramCreate to compile, run tsc-alias, and run
    const origAfterProgramCreate = host.afterProgramCreate!;
    host.afterProgramCreate = builder => {
        const program = builder.getProgram();
        program.emit(undefined, undefined, undefined, undefined, {
            before: [addReflectErrorForClass(), addReflectMetadataImport, addErrorMap()],
        });
        
        // error check
        const allDiagnostics = ts.getPreEmitDiagnostics(program);
        if (allDiagnostics.length > 0) {
            console.error(ts.formatDiagnosticsWithColorAndContext(allDiagnostics, {
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getCanonicalFileName: f => f,
                getNewLine: () => '\n',
            }));
            return; // Skip running if there are compilation errors
        }

        // Get output directory from tsconfig
        const compilerOptions = program.getCompilerOptions();
        const outDir = compilerOptions.outDir || 'dist';
        const entryPoint = 'dist/index.js'; // Adjust based on your project structure

        // Run tsc-alias and then the compiled output
        async function runTscAliasAndOutput() {
            // Kill existing process if running
            if (runningProcess) {
                runningProcess.kill();
                runningProcess = null;
            }

            try {
                // Run tsc-alias to resolve path aliases
                console.log('Running tsc-alias...');
                await execAsync('npx tsc-alias');
                console.log('tsc-alias completed.');

                // Check if output file exists
                if (ts.sys.fileExists(entryPoint)) {
                    console.log(`Running ${entryPoint}...`);
                    // Use spawn with stdio: 'inherit' to preserve colored output
                    runningProcess = spawn('node', [entryPoint], { stdio: 'inherit' });

                    runningProcess.on('close', code => {
                        console.log(`Process exited with code ${code}`);
                        runningProcess = null;
                    });
                } else {
                    console.warn(`Output file ${entryPoint} not found.`);
                }
            } catch (error) {
                console.error('Error during tsc-alias or running output:', error);
            }
        }

        // Execute after compilation
        runTscAliasAndOutput().catch(err => console.error('Run failed:', err));

        origAfterProgramCreate(builder);
    };

    ts.createWatchProgram(host);
}

createWatchAndRun();
