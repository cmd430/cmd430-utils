import { parse } from '../_internal/parse.js'

export const italic = (...args) => `\x1b[3m${parse({ colors: false }, ...args)}\x1b[23m`
