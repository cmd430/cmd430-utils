import type { FormattingFN } from '.'
import { parse } from '../Private'

export const bold: FormattingFN = (...args) => `\x1b[1m${parse({ colors: false }, ...args)}\x1b[22m`
