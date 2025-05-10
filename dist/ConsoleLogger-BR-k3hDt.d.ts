interface LogTagOptions {
    center?: boolean;
    centerPadInner?: boolean;
    formatting?: boolean;
    showHidden?: boolean;
    devOnly?: boolean;
}
declare class Logger {
    private static _maxTagLength;
    private _tag;
    private _tagCenter;
    private _tagCenterPadInner;
    private _tagDevOnly;
    private _formatting;
    private _showHidden;
    constructor(tag?: string, tagOpts?: LogTagOptions);
    private _logTag;
    private _msg;
    log(...args: Parameters<typeof console.log>): void;
    info(...args: Parameters<typeof console.info>): void;
    warn(...args: Parameters<typeof console.warn>): void;
    error(...args: Parameters<typeof console.error>): void;
    debug(...args: Parameters<typeof console.debug>): void;
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
