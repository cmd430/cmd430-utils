import type { ColorFN } from '.'
import { parse } from '../Private'

export const magenta: ColorFN = (...args) => `\x1b[95m${parse({ colors: false }, ...args)}\x1b[0m`
