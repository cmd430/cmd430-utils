import { C as ColorFN } from './Colors-DfJAe6id.js';

type LogType = 'log' | 'info' | 'warn' | 'error' | 'debug';
type LogTagAlignment = 'left' | 'center' | 'ceter-padded' | 'right' | 'none';
interface LogTagOptions {
    timestamps?: boolean;
    alignment?: LogTagAlignment;
    colors?: boolean;
    showHidden?: boolean;
    showDebug?: boolean;
}
interface NoticeOptions {
    type?: LogType;
    colorFn?: ColorFN;
    style?: 'single' | 'rounded' | 'double';
}

/**
 * Logger with timestamps, and tagged log messages
 */
declare class Logger {
    private static _maxTagLength;
    private static _tagColors;
    private _tag;
    private _timestamps;
    private _alignment;
    private _colors;
    private _showHidden;
    private _showDebug;
    /**
     * Creates a new Logger instance
     *
     * @example
     * const { log, info, warn, error, debug } = new Logger()
     *
     * @example
     * const { log, info, warn, error, debug } = new Logger('Tagged Log')
     */
    constructor(tag?: null | string, tagOpts?: LogTagOptions);
    private _logTag;
    private _msg;
    /**
     * Print a message tagged as [LOG]
     */
    log(...args: Parameters<typeof console.log>): void;
    /**
     * Print a message tagged as [INFO]
     */
    info(...args: Parameters<typeof console.info>): void;
    /**
     * Print a message tagged as [WARN]
     */
    warn(...args: Parameters<typeof console.warn>): void;
    /**
     * Print a message tagged as [ERROR]
     */
    error(...args: Parameters<typeof console.error>): void;
    /**
     * Print a message tagged as [DEBUG]
     */
    debug(...args: Parameters<typeof console.debug>): void;
    /**
     * Print a notice tagged with `[options.type]` default `[INFO]`
     */
    notice(notice: string, options?: NoticeOptions): void;
    /**
     * Toggle showing debug logs
     * Optionally set value manually by setting [enabled] param
     */
    toggleDebug(enabled?: boolean): boolean;
}

/**
 * @example
 * import { ConsoleLogger } from 'cmd430-utils/log'
 *
 * ConsoleLogger.setDir(import.meta.dir)              // optional defaults to cwd
 * ConsoleLogger.setNames('stdout.log', 'stderr.log') // optional these are the defaults
 * ConsoleLogger.enable()
 * ConsoleLogger.clear()                              // optional clears the log files
 */
declare class ConsoleLogger {
    private static _console;
    private static _enabled;
    private static _dirPath;
    private static _stdOut;
    private static _stdErr;
    /**
     * Clear/Delete the log files if they exist
     */
    static clear(): void;
    private static get stdOutPath();
    private static get stdErrPath();
    private static _write;
    /**
     * Enable writing console.<log|info|warn|error|debug|group|groupEnd> to log files
     */
    static enable(): void;
    /**
     * Disable writing console.<log|info|warn|error|debug|group|groupEnd> to log files
     */
    static disable(): void;
    /**
     * Toggle writing console.<log|info|warn|error|debug|group|groupEnd> to log files
     */
    static toggle(): void;
    /**
     * Set the directory path for the log files
     */
    static setDir(dirpath: string): void;
    /**
     * File names for the two log files (stdout, stderr)
     */
    static setNames(stdout: string, stderr: string): void;
    /**
     * Check if writing the log files is enabled or not
     */
    static get enabled(): boolean;
}

export { ConsoleLogger as C, Logger as L };
