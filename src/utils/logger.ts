import chalk, { ChalkInstance } from 'chalk';
import path from 'path';
import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import env from '../env';

export type LogMessage = string;

export type LogContext = object;

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}


const colors: Record<string, ChalkInstance> = {
    [LogLevel.DEBUG]: chalk.blue,
    [LogLevel.INFO]: chalk.green,
    [LogLevel.WARN]: chalk.yellow,
    [LogLevel.ERROR]: chalk.red.bold,
}

const consoleTransport = new transports.Console({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format((info) => {
            
            let level = info.level.toUpperCase();
            info.context = info.context ? `\n[CONTEXT] ${JSON.stringify(info.context, null, 2)}` : '';
            if (colors[info.level]) {
                level = colors[info.level](level);
                info.message = colors[info.level](info.message);
                info.context = colors[info.level](info.context);
            }
            info.level = level;
            info.module_name = chalk.yellow((info.module_name as string).toUpperCase());

            return info;
        })(),
        format.printf((data) => {
            let { module_name, timestamp, level, message, context, ...metadata } = data as any;
            const text = `${timestamp.padEnd(25)} [${module_name.padEnd(20)}] [${level.padEnd(15)}]: ${message}${context}`;
            return text;
        }),
    ),
});

const transportArray: winston.transport | winston.transport[] | undefined = [consoleTransport]

if (env.NODE_ENV === 'production') {
    transportArray.push(new DailyRotateFile({
        filename: path.join(__dirname, `../../logs/TOOL-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
        level: 'info',
        format: format.combine(
            format.timestamp(),
            format.metadata(),
            format(info => {
                return info;
            })(),
            format.json()
        ),
    }));
}

const logger = winston.createLogger({
    level: env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
    transports: transportArray,
})


export class Logger {
    private _module_name: string = 'default';
    private _logger: winston.Logger;

    constructor(module_name?: string) {
        this._module_name = module_name ? module_name : 'default';
        this._logger = logger.child({ module_name: this._module_name });
    }

    info(message: LogMessage, context?: LogContext) {
        this.log(LogLevel.INFO, message, context);
    }

    log(level: LogLevel, message: LogMessage, context?: LogContext) {
        this._logger.log({
            level: level,
            message: message,
            context: context,
        });
    }

    debug(message: LogMessage, context?: LogContext) {
        this.log(LogLevel.DEBUG, message, context);
    }

    warn(message: LogMessage, context?: LogContext) {
        this.log(LogLevel.WARN, message, context);
    }

    error(message: LogMessage, context?: LogContext) {
        this.log(LogLevel.ERROR, message, context);
    }
}