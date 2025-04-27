import type { ColorFN } from '.'
import { parse } from '../Private'

export const grey: ColorFN = (...args) => `\x1b[90m${parse({ colors: false }, ...args)}\x1b[0m`
