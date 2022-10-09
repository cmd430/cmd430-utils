import { parse } from '../_internal/parse.js'

export const green = (...args) => `\x1b[92m${parse({ colors: false }, ...args)}\x1b[0m`
