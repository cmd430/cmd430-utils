import type { LogType } from '../Log/Private'
import { grey, red, yellow, magenta, cyan, white, type ColorFN } from '../Log/Colors'
import { strip } from '../Log/Formatting'
import { parse, timestamp as currentTimestamp, supportsColor } from '../Log/Private'
import { isString, isDevEnv, padCenter } from '../Utils'

type LogTagAlignment = 'left' | 'center' | 'ceter-padded' | 'right' | 'none'
interface LogTagOptions {
  timestamps?: boolean
  alignment?: LogTagAlignment
  colors?: boolean
  showHidden?: boolean
  devOnly?: boolean
}

const timestamp: () => string = () => grey(`[${currentTimestamp()}]`)
const filterMessage: (args: any[]) => any[] = args => args.filter(a => a)
const paddedTag: (tag: string, length?: number) => string = (tag, length = 7) => tag.padEnd(length)

/**
 * Logger with timestamps, and tagged log messages
 */
export class Logger {

  private static _maxTagLength = 0

  private _tag: string
  private _timestamps: boolean
  private _alignment: LogTagAlignment
  private _colors: boolean
  private _showHidden: boolean
  private _devOnly: boolean

  /**
   * Creates a new Logger instance
   *
   * @example
   * const { log, info, warn, error, debug } = new Logger()
   *
   * @example
   * const { log, info, warn, error, debug } = new Logger('Tagged Log')
   */
  constructor (tag?: string, tagOpts?: LogTagOptions) {
    // Allow destructuring the methods
    this.debug = this.debug.bind(this)
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)

    this._tag = tag?.trim() ?? ''
    this._timestamps = tagOpts?.timestamps ?? true
    this._alignment = tagOpts?.alignment ?? 'center'
    this._colors = tagOpts?.colors ?? supportsColor()
    this._showHidden = tagOpts?.showHidden ?? false
    this._devOnly = tagOpts?.devOnly ?? false

    if (this._tag) this._tag = `[ ${this._tag} ]`
    // eslint-disable-next-line no-underscore-dangle
    if (this._tag && this._tag.length > Logger._maxTagLength) Logger._maxTagLength = this._tag.length
  }

  private _logTag () {
    if (this._devOnly === true && isDevEnv() === false) return ''

    if (this._alignment === 'center') {
      // eslint-disable-next-line no-underscore-dangle
      return this._tag ? white(padCenter(this._tag, Logger._maxTagLength)) : paddedTag('', Logger._maxTagLength)
    }

    if (this._alignment === 'ceter-padded') {
      // eslint-disable-next-line no-underscore-dangle
      return this._tag ? white(`[${padCenter(this._tag.slice(1,-1), Logger._maxTagLength - 2)}]`) : paddedTag('', Logger._maxTagLength)
    }

    if (this._alignment === 'left') {
      // eslint-disable-next-line no-underscore-dangle
      return this._tag ? white(paddedTag(this._tag, Logger._maxTagLength)) : paddedTag('', Logger._maxTagLength)
    }

    // none
    return this._tag ? white(this._tag) : ''
  }

  private _msg (type: LogType, color: ColorFN, ...args: any[]) {
    // eslint-disable-next-line no-console
    return console[type](...filterMessage([
      this._timestamps ? timestamp() : '',
      this._logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({
        colors: true,
        showHidden: type === 'debug' ? true : this._showHidden,
        logType: type
      }, ...args)
    ]).map(arg => isString(arg) && this._colors === false ? strip(arg) : arg))
  }

  /**
   * Print a message tagged as [LOG]
   */
  public log (...args: Parameters<typeof console.log>): void {
    return this._msg('log', white, ...args)
  }

  /**
   * Print a message tagged as [INFO]
   */
  public info (...args: Parameters<typeof console.info>): void {
    return this._msg('info', cyan, ...args)
  }

  /**
   * Print a message tagged as [WARN]
   */
  public warn (...args: Parameters<typeof console.warn>): void {
    return this._msg('warn', yellow, ...args)
  }

  /**
   * Print a message tagged as [ERROR]
   */
  public error (...args: Parameters<typeof console.error>): void {
    return this._msg('error', red, ...args)
  }

  /**
   * Print a message tagged as [DEBUG]
   */
  public debug (...args: Parameters<typeof console.debug>): void {
    return isDevEnv() ? this._msg('debug', magenta, ...args) : undefined
  }

}
