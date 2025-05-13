import type { FormattingFN } from '../../Types'
import { parse } from '../Private'

/**
 * Format text in bold
 * @example
 * bold('this should be bold!')
 */
export const bold: FormattingFN = (...args) => `\x1b[1m${parse({ colors: false }, ...args)}\x1b[22m`
