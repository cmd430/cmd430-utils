import type { ColorFN } from '.'
import { parse } from '../Private'

export const cyan: ColorFN = (...args) => `\x1b[96m${parse({ colors: false }, ...args)}\x1b[0m`
