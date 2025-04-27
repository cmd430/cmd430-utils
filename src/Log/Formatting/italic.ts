import type { FormattingFN } from '.'
import { parse } from '../Private'

export const italic: FormattingFN = (...args) => `\x1b[3m${parse({ colors: false }, ...args)}\x1b[23m`
