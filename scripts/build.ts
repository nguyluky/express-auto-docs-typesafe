import 'reflect-metadata';
import * as ts from 'typescript';
import { addReflectMetadataImport, customTransformer, customTransformer2 } from './transformer';

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const program = ts.createProgram(fileNames, options);
  program.emit(undefined, undefined, undefined, undefined, {
    before: [customTransformer(), addReflectMetadataImport, customTransformer2()],
  });
}

const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
if (!configPath) {
  throw new Error('Could not find tsconfig.json');
}

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const compilerOptions = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './');

compile(compilerOptions.fileNames, compilerOptions.options);
