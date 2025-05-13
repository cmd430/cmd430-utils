import type { FormattingFN } from '.'
import { parse } from '../Private'

/**
 * Format text in italics
 * @example
 * italic('this should be italic!')
 */
export const strikethrough: FormattingFN = (...args) => `\x1b[9m${parse({ colors: false }, ...args)}\x1b[29m`
