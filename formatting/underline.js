import { parse } from '../_internal/parse.js'

export const underline = (...args) => `\x1b[4m${parse({ colors: false }, ...args)}\x1b[24m`
