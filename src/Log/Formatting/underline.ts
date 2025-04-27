import type { FormattingFN } from '.'
import { parse } from '../Private'

export const underline: FormattingFN = (...args) => `\x1b[4m${parse({ colors: false }, ...args)}\x1b[24m`
