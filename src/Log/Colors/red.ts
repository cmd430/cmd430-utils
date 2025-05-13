import type { ColorFN } from '../../Types'
import { parse } from '../Private'

/**
 * Color text red
 * @example
 * red('this should be red!')
 */
export const red: ColorFN = (...args) => `\x1b[91m${parse({ colors: false }, ...args)}\x1b[0m`
