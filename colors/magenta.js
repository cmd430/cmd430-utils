import { parse } from '../_internal/parse.js'

export const magenta = (...args) => `\x1b[95m${parse({ colors: false }, ...args)}\x1b[0m`
