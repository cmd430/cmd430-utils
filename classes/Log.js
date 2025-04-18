import { grey, red, yellow, magenta, cyan, white } from '../colors.js'
import { strip } from '../formatting.js'
import { timestamp as currentTimestamp } from '../_internal/timestamp.js'
import { formatting as supportsFormatting } from '../_internal/supports.js'
import { parse } from '../_internal/parse.js'
import { isString, isObject, isDevEnv, padCenter } from '../misc.js'

const timestamp = () => grey(`[${currentTimestamp()}]`)
const filterMessage = args => args.filter(a => a)
const paddedTag = (tag, length = 7) => tag.padEnd(length)

export class Log {

  static #maxTagLength = 0

  /* eslint-disable lines-between-class-members */
  #Log = Log
  #tag = undefined
  #tagCenter = true
  #tagCenterPadInner = true
  #tagDevOnly = false
  #formatting = true
  #showHidden = false
  /* eslint-enable lines-between-class-members */

  /**
   * @constructor
   * @param {String} [tag] - String tag
   * @param {Object} [tagOpts] - Object with tag options
   * @param {String} [tagOpts.center=true] - If tag should be centered
   * @param {String} [tagOpts.centerPadInner=true] - If tag should be centered inside [] or if the [] should be centered
   * @param {Boolean} [tagOpts.devOnly=false] - If tag should only been shown in dev mode
   * @param {Boolean} [tagOpts.formatting=true] - If logs should be have colors and styles enabled
   * @param {Boolean} [tagOpts.showHidden=false] - If objects should have hidden properties showin in the log (debug always shows hidden)
   */
  constructor (tag, tagOpts = undefined) {
    this.debug = this.debug.bind(this)
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)

    // Legacy Support
    if (isObject(tag)) {
      if (isString(tag.tag)) this.#tag = tag.tag?.trim()
      if (isObject(tag.tag)) {
        this.#tag = tag.tag?.text?.trim()
        this.#tagCenter = tag.tag?.center ?? true
        this.#tagDevOnly = tag.tag?.devOnly ?? false
      }
      this.#formatting = tag.formatting ?? supportsFormatting()
    }
    // End Legacy Support

    if (isString(tag)) this.#tag = tag.trim()
    if (isObject(tagOpts)) {
      this.#tagCenter = tagOpts?.center ?? true
      this.#tagCenterPadInner = tagOpts?.centerPadInner ?? true
      this.#tagDevOnly = tagOpts?.devOnly ?? false
      this.#formatting = tagOpts?.formatting ?? supportsFormatting()
      this.#showHidden = tagOpts?.showHidden ?? false
    }

    if (this.#tag) this.#tag = `[ ${this.#tag} ]`
    if (this.#tag && this.#tag.length > Log.#maxTagLength) Log.#maxTagLength = this.#tag.length
  }

  #logTag () {
    if (this.#tagDevOnly === true && isDevEnv() === false) return
    if (this.#tagCenter) {
      if (this.#tagCenterPadInner) return this.#tag ? white(`[${padCenter(this.#tag.slice(1,-1), this.#Log.#maxTagLength - 2)}]`) : paddedTag('', this.#Log.#maxTagLength)
      return this.#tag ? white(padCenter(this.#tag, this.#Log.#maxTagLength)) : paddedTag('', this.#Log.#maxTagLength)
    }

    return this.#tag ? white(paddedTag(this.#tag, this.#Log.#maxTagLength)) : paddedTag('', this.#Log.#maxTagLength)
  }

  #msg (type, color, ...args) {
    // eslint-disable-next-line no-console
    return console[type](...filterMessage([
      timestamp(),
      this.#logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({
        colors: true,
        showHidden: type === 'debug' ? true : this.#showHidden,
        logType: type
      }, ...args)
    ]).map(arg => isString(arg) && this.#formatting === false ? strip(arg) : arg))
  }

  log (...args) {
    return this.#msg('log', white, ...args)
  }

  info (...args) {
    return this.#msg('info', cyan, ...args)
  }

  warn (...args) {
    return this.#msg('warn', yellow, ...args)
  }

  error (...args) {
    return this.#msg('error', red, ...args)
  }

  debug (...args) {
    return isDevEnv() ? this.#msg('debug', magenta, ...args) : undefined
  }

}
