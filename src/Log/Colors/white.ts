import type { ColorFN } from '.'
import { parse } from '../Private'

export const white: ColorFN = (...args) => `\x1b[97m${parse({ colors: false }, ...args)}\x1b[0m`
