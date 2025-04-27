import type { ColorFN } from '.'
import { parse } from '../Private'

export const red: ColorFN = (...args) => `\x1b[91m${parse({ colors: false }, ...args)}\x1b[0m`
