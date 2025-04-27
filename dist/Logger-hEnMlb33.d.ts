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

export { Logger as L };
