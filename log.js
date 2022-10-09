import { grey, red, yellow, magenta, cyan, white } from './colors.js'
import { strip } from './formatting.js'
import { timestamp as currentTimestamp } from './_internal/timestamp.js'
import { parse } from './_internal/parse.js'
import { isString, isObject } from './misc.js'

const timestamp = () => grey(`[${currentTimestamp()}]`)
const filterMessage = args => args.filter(a => a)
const paddedTag = (tag, length = 7) => tag.padEnd(length)
const isDevEnv = () => process.env.NODE_ENV?.startsWith('prod') ?? false === false

export class Log {

  static #maxTagLength = 0

  #Log = Log
  #tag
  #tagDevOnly
  #formatting

  /**
   * @constructor
   * @param {Object|String} [tagOpts] - String or an Object with log tag options
   * @param {Object|String} [tagOpts.tag=undefind] - String to tag log messages with or log tag options
   * @param {String} [tagOpts.tag.text=undefind] - String to tag log messages with
   * @param {Boolean} [tagOpts.tag.devOnly=false] - If tag should only been shown in dev mode
   * @param {Boolean} [tagOpts.formatting=true] - If logs should be have colors and styles enabled
   */
  constructor (tagOpts) {
    this.debug = this.debug.bind(this)
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)

    if (isString(tagOpts)) this.#tag = tagOpts.trim()
    if (isObject(tagOpts)) {
      if (isString(tagOpts.tag)) this.#tag = tagOpts.tag?.trim()
      if (isObject(tagOpts.tag)) {
        this.#tag = tagOpts.tag?.text?.trim()
        this.#tagDevOnly = tagOpts.tag?.devOnly ?? false
      }
      this.#formatting = tagOpts.formatting ?? true
    }
    if (this.#tag && this.#tag.length + 2 > Log.#maxTagLength) Log.#maxTagLength = this.#tag.length + 2
  }

  #logTag () {
    if (this.#tagDevOnly === true && isDevEnv() === false) return
    return this.#tag ? grey(paddedTag(`[${this.#tag}]`, this.#Log.#maxTagLength)) : paddedTag('', this.#Log.#maxTagLength)
  }
  #msg (type, color, ...args) {
    return console[type](...filterMessage([
      timestamp(),
      this.#logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({ colors: true }, ...args)
    ]).map(arg => isString(arg) && this.#formatting === false ? strip(arg) : arg))
  }

  log (...args) { return this.#msg('log', white, ...args) }
  info (...args) { return this.#msg('info', cyan, ...args) }
  warn (...args) { return this.#msg('warn', yellow, ...args) }
  error (...args) { return this.#msg('error', red, ...args) }
  debug (...args) { return isDevEnv() ? this.#msg('debug', magenta, ...args) : undefined }

}
