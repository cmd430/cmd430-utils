import type { ColorFN } from '.'
import { parse } from '../Private'

/**
 * Color text green
 * @example
 * green('this should be green!')
 */
export const green: ColorFN = (...args) => `\x1b[92m${parse({ colors: false }, ...args)}\x1b[0m`
