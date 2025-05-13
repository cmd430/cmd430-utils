import type { ColorFN } from '../../Types'
import { parse } from '../Private'

/**
 * Color text grey
 * @example
 * grey('this should be grey!')
 */
export const grey: ColorFN = (...args) => `\x1b[90m${parse({ colors: false }, ...args)}\x1b[0m`
