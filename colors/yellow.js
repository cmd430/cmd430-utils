import { parse } from '../_internal/parse.js'

export const yellow = (...args) => `\x1b[93m${parse({ colors: false }, ...args)}\x1b[0m`
