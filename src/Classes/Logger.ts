import { grey, red, yellow, magenta, cyan, white } from '../Log/Colors'
import { strip } from '../Log/Formatting'
import { parse, timestamp as currentTimestamp, supportsColor } from '../Log/Private'
import type { LogTagAlignment, LogTagOptions, LogType, NoticeOptions } from '../Types/Log'
import { isString, isDevEnv, padCenter } from '../Utils'

const timestamp: () => string = () => grey(`[${currentTimestamp()}]`)
const filterMessage: (args: any[]) => any[] = args => args.filter(a => a)
const paddedTag: (tag: string, length?: number, start?: boolean) => string = (tag, length = 7, start = false) => start ? tag.padStart(length) : tag.padEnd(length)

/**
 * Logger with timestamps, and tagged log messages
 */
export class Logger {

  private static _maxTagLength = 0
  private static _tagColors = {
    log: white,
    info: cyan,
    warn: yellow,
    error: red,
    debug: magenta
  }

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
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)
    this.debug = this.debug.bind(this)
    this.notice = this.notice.bind(this)

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

    if (this._tag && this._alignment === 'left') {
      // eslint-disable-next-line no-underscore-dangle
      return white(paddedTag(this._tag, Logger._maxTagLength))
    }

    if (this._tag && this._alignment === 'center') {
      // eslint-disable-next-line no-underscore-dangle
      return white(padCenter(this._tag, Logger._maxTagLength))
    }

    if (this._tag && this._alignment === 'ceter-padded') {
      // eslint-disable-next-line no-underscore-dangle
      return white(`[${padCenter(this._tag.slice(1,-1), Logger._maxTagLength - 2)}]`)
    }

    if (this._tag && this._alignment === 'right') {
      // eslint-disable-next-line no-underscore-dangle
      return white(paddedTag(this._tag, Logger._maxTagLength, true))
    }

    if (this._tag && this._alignment === 'none') {
      return white(this._tag)
    }

    // eslint-disable-next-line no-underscore-dangle
    return this._alignment === 'none' ? '' : paddedTag('', Logger._maxTagLength)

  }

  private _msg (type: LogType, ...args: any[]) {
    // eslint-disable-next-line no-underscore-dangle
    const color = Logger._tagColors[type as keyof typeof Logger._tagColors]

    // eslint-disable-next-line no-console
    return console[type](...filterMessage([
      this._timestamps ? timestamp() : '',
      this._logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({
        colors: true,
        showHidden: type === 'debug' ? true : this._showHidden
      }, ...args)
    ]).map(arg => isString(arg) && this._colors === false ? strip(arg) : arg))
  }

  /**
   * Print a message tagged as [LOG]
   */
  public log (...args: Parameters<typeof console.log>): void {
    return this._msg('log', ...args)
  }

  /**
   * Print a message tagged as [INFO]
   */
  public info (...args: Parameters<typeof console.info>): void {
    return this._msg('info', ...args)
  }

  /**
   * Print a message tagged as [WARN]
   */
  public warn (...args: Parameters<typeof console.warn>): void {
    return this._msg('warn', ...args)
  }

  /**
   * Print a message tagged as [ERROR]
   */
  public error (...args: Parameters<typeof console.error>): void {
    return this._msg('error', ...args)
  }

  /**
   * Print a message tagged as [DEBUG]
   */
  public debug (...args: Parameters<typeof console.debug>): void {
    return isDevEnv() ? this._msg('debug', ...args) : undefined
  }


  /**
   * Print a notice tagged with `[options.type]` default `[INFO]`
   */
  public notice (notice: string, options?: NoticeOptions): void {
    const type = options?.type ?? 'info'
    // eslint-disable-next-line no-underscore-dangle
    const color = options?.colorFn ?? Logger._tagColors[type as keyof typeof Logger._tagColors]
    const style = options?.style ?? 'single'
    const boxWidth = strip(notice).length + 2
    const boxChars = {
      single: {
        topLeft: '┌',
        topRight:'┐',
        verticle: '│',
        horizontal: '─',
        bottomLeft: '└',
        bottomRight:'┘'
      },
      rounded: {
        topLeft: '╭',
        topRight:'╮',
        verticle: '│',
        horizontal: '─',
        bottomLeft: '╰',
        bottomRight:'╯'
      },
      double: {
        topLeft: '╔',
        topRight:'╗',
        verticle: '║',
        horizontal: '═',
        bottomLeft: '╚',
        bottomRight:'╝'
      }
    }

    this[type](`\x1b[2K${color(`${boxChars[style as keyof typeof boxChars].topLeft}${boxChars[style as keyof typeof boxChars].horizontal.repeat(boxWidth)}${boxChars[style as keyof typeof boxChars].topRight}`)}`)
    this[type](`${color(boxChars[style as keyof typeof boxChars].verticle)} ${notice} ${color(boxChars[style as keyof typeof boxChars].verticle)}`)
    this[type](`\x1b[2K${color(`${boxChars[style as keyof typeof boxChars].bottomLeft}${boxChars[style as keyof typeof boxChars].horizontal.repeat(boxWidth)}${boxChars[style as keyof typeof boxChars].bottomRight}`)}`)
  }

}
