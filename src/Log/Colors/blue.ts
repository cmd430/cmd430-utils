import type { ColorFN } from '../../Types'
import { parse } from '../Private'

/**
 * Color text blue
 * @example
 * blue('this should be blue!')
 */
export const blue: ColorFN = (...args) => `\x1b[94m${parse({ colors: false }, ...args)}\x1b[0m`
