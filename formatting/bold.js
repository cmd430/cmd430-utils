import { parse } from '../_internal/parse.js'

export const bold = (...args) => `\x1b[1m${parse({ colors: false }, ...args)}\x1b[22m`
