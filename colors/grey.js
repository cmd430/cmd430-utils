import { parse } from '../_internal/parse.js'

export const grey = (...args) => `\x1b[90m${parse({ colors: false }, ...args)}\x1b[0m`
