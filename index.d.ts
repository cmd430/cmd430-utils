declare module 'cmd430-utils' {
  // Log
  export interface LogTagOptions {
    center?: boolean
    centerPadInner?: boolean
    formatting?: boolean
    showHidden?: boolean
    devOnly?: boolean
  }
  export class Log {
    constructor (
      tag?: string,
      tagOpts?: LogTagOptions
    )

    log (message?: any, ...optionalParams: any[]): void
    info (message?: any, ...optionalParams: any[]): void
    warn (message?: any, ...optionalParams: any[]): void
    error (message?: any, ...optionalParams: any[]): void
    debug (message?: any, ...optionalParams: any[]): void
  }

  // Colors
  export function cyan (message?: any, ...optionalParams: any[]): string
  export function green (message?: any, ...optionalParams: any[]): string
  export function grey (message?: any, ...optionalParams: any[]): string
  export function magenta (message?: any, ...optionalParams: any[]): string
  export function random (message?: any, ...optionalParams: any[]): string
  export function red (message?: any, ...optionalParams: any[]): string
  export function white (message?: any, ...optionalParams: any[]): string
  export function yellow (message?: any, ...optionalParams: any[]): string

  // Formatting
  export function bold (message?: any, ...optionalParams: any[]): string
  export function html (message?: any, ...optionalParams: any[]): string
  export function italic (message?: any, ...optionalParams: any[]): string
  export function strip (message?: any, ...optionalParams: any[]): string
  export function underline (message?: any, ...optionalParams: any[]): string

  // Misc
  export function __dirname (): string
  export function __filename (): string
  export function calculate (expression: string): number
  export function isArray (object: any): boolean
  export function isAsyncFunction (object: any): boolean
  export function isBoolean (object: any): boolean
  export function isDate (object: any): boolean
  export function isDevEnv (): boolean
  export function isEqual <T> (a: T, b: T): boolean
  export function isError (object: any): boolean
  export function isFunction (object: any): boolean
  export function isNull (object: any): boolean
  export function isNumber (object: any): boolean
  export function isObject (object: any): boolean
  export function isRegexp (object: any): boolean
  export function isString (object: any): boolean
  export function isType (type: string, object: any): boolean
  export function isUndefined (object: any): boolean
  export function isWhat (object: any): string
  export function omit <T extends object> (obj: T, ...keys: (keyof T & string)[]): Omit<T, keyof T>
  export function padCener (str: string, maxLen: number): string
  export interface ParsedArgs {
    [flag: string]: string | boolean | string[]
  }
  export function parseArgs (): ParsedArgs
  export function pick <T extends object> (obj: T, ...keys: (keyof T & string)[]): Pick<T, keyof T>
  export interface TokenMap {
    [token: string]: string
  }
  export function replaceTokens (string: string, tokens: TokenMap): string
  export interface WaitOptions {
    minutes?: number
    seconds?: number
    milliseconds?: number
  }
  export function wait (delay: WaitOptions)
}
