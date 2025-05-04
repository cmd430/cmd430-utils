declare function calculate(expression: string): number;

declare function fetchJSON<T = any>(...[input, init]: Parameters<typeof fetch>): Promise<T>;

declare function fetchText<T = string>(...[input, init]: Parameters<typeof fetch>): Promise<T>;

declare function isArray(object: any): boolean;

declare function isAsyncFunction(object: any): boolean;

declare function isBoolean(object: any): boolean;

declare function isDate(object: any): boolean;

declare function isDevEnv(): boolean;

declare function isEqual<T>(a: T, b: T): boolean;

declare function isError(object: any): boolean;

declare function isFunction(object: any): boolean;

declare function isNull(object: any): boolean;

declare function isNumber(object: any): boolean;

declare function isObject(object: any): boolean;

declare function isRegExp(object: any): boolean;

declare function isString(object: any): boolean;

declare function isType(type: ObjectType, object: any): boolean;
type ObjectType = 'Array' | 'AsyncFunction' | 'Boolean' | 'Date' | 'Error' | 'Function' | 'Null' | 'Number' | 'Object' | 'RegExp' | 'String' | 'Undefined';

declare function isUndefined(object: any): boolean;

declare function isWhat(object: any): ObjectType;

declare abstract class SmartResponse<T = any> extends Response {
    abstract get data(): T;
}
declare function obtain<T = any>(...[input, init]: Parameters<typeof fetch>): Promise<SmartResponse<T>>;

declare function omit<T extends object>(obj: T, ...keys: (keyof T & string)[]): Omit<T, keyof T>;

declare function padCenter(str: string, maxLen: number): string;

declare function parseArgs(): Args;
interface Args {
    [flag: string]: string | string[] | boolean;
}

declare function pick<T extends object>(obj: T, ...keys: (keyof T & string)[]): Pick<T, keyof T>;

declare function replaceTokens(string: string, tokens: TokenMap): string;
interface TokenMap {
    [token: string]: string;
}

declare function wait(delay: WaitOptions): Promise<void>;
interface WaitOptions {
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

export { type ObjectType, SmartResponse, calculate, fetchJSON, fetchText, isArray, isAsyncFunction, isBoolean, isDate, isDevEnv, isEqual, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isType, isUndefined, isWhat, obtain, omit, padCenter, parseArgs, pick, replaceTokens, wait };
