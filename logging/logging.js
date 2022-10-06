const { grey, red, yellow, magenta, cyan, white } = require('./colors')
const currentTimestamp = require('./utils/timestamp')
const parse = require('./utils/parse')

const timestamp = () => grey(`[${currentTimestamp()}]`)
const filterMessage = args => args.filter(a => a)
const paddedTag = (tag, length = 7) => tag.padEnd(length)

class Log {

  static #maxTagLength = 0;

  #Log = Log
  #tag

  /**
   * @constructor
   * @param {String} [tag]
   */
  constructor (tag) {
    this.debug = this.debug.bind(this)
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)

    tag = tag?.trim()

    if (tag?.trim() && tag.length + 2 > Log.#maxTagLength) Log.#maxTagLength = tag.length + 2
    if (tag) this.#tag = tag
  }

  #logTag () { return this.#tag ? grey(paddedTag(`[${this.#tag}]`, this.#Log.#maxTagLength)) : paddedTag('', this.#Log.#maxTagLength) }
  #msg (type, color, ...args) {
    return console[type](...filterMessage([
      timestamp(),
      this.#logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({ colors: true }, ...args)
    ]))
  }

  log (...args) { return this.#msg('log', white, ...args) }
  info (...args) { return this.#msg('info', cyan, ...args) }
  warn (...args) { return this.#msg('warn', yellow, ...args) }
  error (...args) { return this.#msg('error', red, ...args) }
  debug (...args) { return process.env.NODE_ENV?.startsWith('prod') ? undefined : this.#msg('debug', magenta, ...args) }

}

module.exports = Log
