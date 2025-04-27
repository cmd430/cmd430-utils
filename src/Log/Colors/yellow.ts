import type { ColorFN } from '.'
import { parse } from '../Private'

export const yellow: ColorFN = (...args) => `\x1b[93m${parse({ colors: false }, ...args)}\x1b[0m`
