import type { ColorFN } from '.'
import { parse } from '../Private'

export const green: ColorFN = (...args) => `\x1b[92m${parse({ colors: false }, ...args)}\x1b[0m`
