import type { ColorFN } from '.'
import { parse } from '../Private'

/**
 * Color text cyan
 * @example
 * cyan('this should be cyan!')
 */
export const cyan: ColorFN = (...args) => `\x1b[96m${parse({ colors: false }, ...args)}\x1b[0m`
