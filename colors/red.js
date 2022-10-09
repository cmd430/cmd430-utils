import { parse } from '../_internal/parse.js'

export const red = (...args) => `\x1b[91m${parse({ colors: false }, ...args)}\x1b[0m`
