import type { LogType } from '../Log/Private'
import { grey, red, yellow, magenta, cyan, white, type ColorFN } from '../Log/Colors'
import { strip } from '../Log/Formatting'
import { parse, timestamp as currentTimestamp, formatting as supportsFormatting } from '../Log/Private'
import { isString, isDevEnv, padCenter } from '../Utils'

interface LogTagOptions {
  center?: boolean
  centerPadInner?: boolean
  formatting?: boolean
  showHidden?: boolean
  devOnly?: boolean
}

const timestamp: () => string = () => grey(`[${currentTimestamp()}]`)
const filterMessage: (args: any[]) => any[] = args => args.filter(a => a)
const paddedTag: (tag: string, length?: number) => string = (tag, length = 7) => tag.padEnd(length)

export class Logger {

  private static _maxTagLength = 0

  private _tag: string
  private _tagCenter: boolean
  private _tagCenterPadInner: boolean
  private _tagDevOnly: boolean
  private _formatting: boolean
  private _showHidden: boolean

  constructor (tag?: string, tagOpts?: LogTagOptions) {
    // Allow destructuring the methods
    this.debug = this.debug.bind(this)
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)

    this._tag = tag?.trim() ?? ''
    this._tagCenter = tagOpts?.center ?? true
    this._tagCenterPadInner = tagOpts?.centerPadInner ?? true
    this._tagDevOnly = tagOpts?.devOnly ?? false
    this._formatting = tagOpts?.formatting ?? supportsFormatting()
    this._showHidden = tagOpts?.showHidden ?? false

    if (this._tag) this._tag = `[ ${this._tag} ]`
    // eslint-disable-next-line no-underscore-dangle
    if (this._tag && this._tag.length > Logger._maxTagLength) Logger._maxTagLength = this._tag.length
  }

  private _logTag () {
    if (this._tagDevOnly === true && isDevEnv() === false) return ''
    if (this._tagCenter) {
      // eslint-disable-next-line no-underscore-dangle
      if (this._tagCenterPadInner) return this._tag ? white(`[${padCenter(this._tag.slice(1,-1), Logger._maxTagLength - 2)}]`) : paddedTag('', Logger._maxTagLength)
      // eslint-disable-next-line no-underscore-dangle
      return this._tag ? white(padCenter(this._tag, Logger._maxTagLength)) : paddedTag('', Logger._maxTagLength)
    }

    // eslint-disable-next-line no-underscore-dangle
    return this._tag ? white(paddedTag(this._tag, Logger._maxTagLength)) : paddedTag('', Logger._maxTagLength)
  }

  private _msg (type: LogType, color: ColorFN, ...args: any[]) {
    // eslint-disable-next-line no-console
    return console[type](...filterMessage([
      timestamp(),
      this._logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({
        colors: true,
        showHidden: type === 'debug' ? true : this._showHidden,
        logType: type
      }, ...args)
    ]).map(arg => isString(arg) && this._formatting === false ? strip(arg) : arg))
  }

  public log (...args: Parameters<typeof console.log>): void {
    return this._msg('log', white, ...args)
  }

  public info (...args: Parameters<typeof console.info>): void {
    return this._msg('info', cyan, ...args)
  }

  public warn (...args: Parameters<typeof console.warn>): void {
    return this._msg('warn', yellow, ...args)
  }

  public error (...args: Parameters<typeof console.error>): void {
    return this._msg('error', red, ...args)
  }

  public debug (...args: Parameters<typeof console.debug>): void {
    return isDevEnv() ? this._msg('debug', magenta, ...args) : undefined
  }

}
