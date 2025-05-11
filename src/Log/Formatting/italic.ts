import type { FormattingFN } from '.'
import { parse } from '../Private'

/**
 * Format text in italics
 * @example
 * italic('this should be italic!')
 */
export const italic: FormattingFN = (...args) => `\x1b[3m${parse({ colors: false }, ...args)}\x1b[23m`
