import type { ColorFN } from '.'
import { parse } from '../Private'

/**
 * Color text magenta
 * @example
 * magenta('this should be magenta!')
 */
export const magenta: ColorFN = (...args) => `\x1b[95m${parse({ colors: false }, ...args)}\x1b[0m`
