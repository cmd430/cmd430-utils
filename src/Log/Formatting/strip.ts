import type { FormatFN } from '.'

// eslint-disable-next-line no-control-regex
export const strip: FormatFN = arg => arg.replace(/\x1b[[(?);]{0,2}(;?\d)*./g, '')
