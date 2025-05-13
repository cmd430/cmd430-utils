import type { ColorFN } from '../../Types'
import { parse } from '../Private'

/**
 * Color text white
 * @example
 * white('this should be white!')
 */
export const white: ColorFN = (...args) => `\x1b[97m${parse({ colors: false }, ...args)}\x1b[0m`
