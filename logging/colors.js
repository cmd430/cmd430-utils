const parse = require('./utils/parse')

module.exports = {
  grey: (...args) => `\x1b[90m${parse({ colors: false }, ...args)}\x1b[0m`,
  red: (...args) => `\x1b[91m${parse({ colors: false }, ...args)}\x1b[0m`,
  green: (...args) => `\x1b[92m${parse({ colors: false }, ...args)}\x1b[0m`,
  yellow: (...args) => `\x1b[93m${parse({ colors: false }, ...args)}\x1b[0m`,
  magenta: (...args) => `\x1b[95m${parse({ colors: false }, ...args)}\x1b[0m`,
  cyan: (...args) => `\x1b[96m${parse({ colors: false }, ...args)}\x1b[0m`,
  white: (...args) => `\x1b[97m${parse({ colors: false }, ...args)}\x1b[0m`,
  random: (...args) => {
    const colors = Object.keys(module.exports).filter(c => c !== 'random')

    return module.exports[colors[Math.floor(Math.random() * colors.length)]](...args)
  }
}
