import { a as ColorHexString, b as ColorRGB, c as RGBArgs } from './Colors-DfJAe6id.js';

/**
 * Calculate a value from a math expression string
 *
 * @example
 * calculate('100 * 2') // 200
 */
declare function calculate(expression: string): number;

/**
 * Return JSON data from fetch
 *
 * @deprecated use `obtain`
 */
declare function fetchJSON<T = any>(...[input, init]: Parameters<typeof fetch>): Promise<T>;

/**
 * Return Text data from fetch
 *
 * @deprecated use `obtain`
 */
declare function fetchText<T = string>(...[input, init]: Parameters<typeof fetch>): Promise<T>;

/**
 * Return an object of `r,g,b` from a hex color string
 */
declare function hexToRgb(hex: ColorHexString): ColorRGB;

/**
 * Check if a given object is an Array
 */
declare function isArray(object: any): boolean;

/**
 * Check if a given object is an Async Function
 */
declare function isAsyncFunction(object: any): boolean;

/**
 * Check if a given object is a Boolean
 */
declare function isBoolean(object: any): boolean;

/**
 * Check if a given object is a Date
 */
declare function isDate(object: any): boolean;

/**
 * Check if running in Prod or Dev (NODE_ENV)
 */
declare function isDevEnv(): boolean;

/**
 * Check if a given object is the same as another given object
 */
declare function isEqual<T>(a: T, b: T): boolean;

/**
 * Check if a given object is an Error
 */
declare function isError(object: any): boolean;

/**
 * Check if a given object is a Function
 */
declare function isFunction(object: any): boolean;

/**
 * Check if a given object is Null
 */
declare function isNull(object: any): boolean;

/**
 * Check if a given object is a Number
 */
declare function isNumber(object: any): boolean;

/**
 * Check if a given object is an Object
 */
declare function isObject(object: any): boolean;

/**
 * Check if a given object is a RegExp
 */
declare function isRegExp(object: any): boolean;

/**
 * Check if a given object is a String
 */
declare function isString(object: any): boolean;

/**
 * Check if a given object is of <type>
 */
declare function isType(type: ObjectType, object: any): boolean;
type ObjectType = 'Array' | 'AsyncFunction' | 'Boolean' | 'Date' | 'Error' | 'Function' | 'Null' | 'Number' | 'Object' | 'RegExp' | 'String' | 'Undefined';

/**
 * Check if a given object is Undefined
 */
declare function isUndefined(object: any): boolean;

/**
 * Return type of a given object
 */
declare function isWhat(object: any): ObjectType;

declare abstract class SmartResponse<T = any> extends Response {
    abstract get data(): T;
}
/**
 * returns a `SmartResponse` that is a `Response` object with an aditional property `data` that contains the
 * resolved `text()` or `json()` data if the response type header has the correct type, `data` is undefined
 * if the response type is not text or json, all Response properties and methods remain usable including `body`
 *
 * @example
 * const { ok, data } = await obtain('https://jsonplaceholder.typicode.com/todos/1')
 *
 * console.log('request was status code 2xx?', ok)
 * console.log('request data:', data)
 */
declare function obtain<T = any>(...[input, init]: Parameters<typeof fetch>): Promise<SmartResponse<T>>;

/**
 * Return a given object with the keys given removed
 */
declare function omit<T extends object>(obj: T, ...keys: (keyof T & string)[]): Omit<T, keyof T>;

/**
 * Returns a string padded on the left and right until max length
 */
declare function padCenter(str: string, maxLen: number, fillStr?: string): string;

/**
 * Return an object of parsed cmdline args
 *
 * @example
 *
 * $ bun example.ts -dD --dev --prod=false --named=value --array[]=one --array[]=two --array[]=three --spaces="this item has spaces"
 *
 * {
 *   d: true,
 *   D: true,
 *   dev: true,
 *   prod: false,
 *   named: 'value',
 *   array: [ 'one', 'two', 'three' ],
 *   spaces: 'this item has spaces'
 * }
 *
 */
declare function parseArgs(): Args;
interface Args {
    [flag: string]: string | string[] | boolean;
}

/**
 * Return a given object with only the keys given
 */
declare function pick<T extends object>(obj: T, ...keys: (keyof T & string)[]): Pick<T, keyof T>;

/**
 * Takes a string and replaces the left hand tokens (keys) from the `tokens` object with the values of those keys
 */
declare function replaceTokens(string: string, tokens: TokenMap): string;
interface TokenMap {
    [token: string]: string;
}

/**
 * Return a hex color string from RGB value
 */
declare function rgbToHex(rgb: RGBArgs): ColorHexString;

/**
 * Async Wait
 */
declare function wait(delay: WaitOptions): Promise<void>;
interface WaitOptions {
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

export { type ObjectType, SmartResponse, calculate, fetchJSON, fetchText, hexToRgb, isArray, isAsyncFunction, isBoolean, isDate, isDevEnv, isEqual, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isType, isUndefined, isWhat, obtain, omit, padCenter, parseArgs, pick, replaceTokens, rgbToHex, wait };
