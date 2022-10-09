import { parse } from '../_internal/parse.js'

export const white = (...args) => `\x1b[97m${parse({ colors: false }, ...args)}\x1b[0m`
