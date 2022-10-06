const { grey, red, yellow, magenta, cyan, white } = require('./colors')
const currentTimestamp = require('./utils/timestamp')
const parse = require('./utils/parse')
const { isString, isObject } = require('../misc')

const timestamp = () => grey(`[${currentTimestamp()}]`)
const filterMessage = args => args.filter(a => a)
const paddedTag = (tag, length = 7) => tag.padEnd(length)
const isDevEnv = () => process.env.NODE_ENV?.startsWith('prod') === false

class Log {

  static #maxTagLength = 0;

  #Log = Log
  #tag
  #tagDevOnly
  #colors

  /**
   * @constructor
   * @param {Object|String} [tagOpts] - String or an Object with log tag options
   * @param {Object|String} [tagOpts.tag=undefind] - String to tag log messages with or log tag options
   * @param {String} [tagOpts.tag.text=undefind] - String to tag log messages with
   * @param {Boolean} [tagOpts.tag.devOnly=false] - If tag should only been shown in dev mode
   * @param {Boolean} [tagOpts.colors=true] - If logs should be have colors enabled
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
      this.#colors = tagOpts.colors ?? true
    }
    if (this.#tag && this.#tag.length + 2 > Log.#maxTagLength) Log.#maxTagLength = this.#tag.length + 2
  }

  #logTag () { if (this.#tagDevOnly === false || isDevEnv()) return this.#tag ? grey(paddedTag(`[${this.#tag}]`, this.#Log.#maxTagLength)) : paddedTag('', this.#Log.#maxTagLength) }
  #msg (type, color, ...args) {
    return console[type](...filterMessage([
      timestamp(),
      this.#logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({ colors: true }, ...args)
    ]).map(arg => isString(arg) && this.#colors === false ? arg.replace(/\x1B[[(?);]{0,2}(;?\d)*./g, '') : arg))
  }

  log (...args) { return this.#msg('log', white, ...args) }
  info (...args) { return this.#msg('info', cyan, ...args) }
  warn (...args) { return this.#msg('warn', yellow, ...args) }
  error (...args) { return this.#msg('error', red, ...args) }
  debug (...args) { return isDevEnv() ? this.#msg('debug', magenta, ...args) : undefined }

}

module.exports = Log
