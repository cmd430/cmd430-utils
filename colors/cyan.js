import { parse } from '../_internal/parse.js'

export const cyan = (...args) => `\x1b[96m${parse({ colors: false }, ...args)}\x1b[0m`
