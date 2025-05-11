import type { FormatFN } from '.'

/**
 * Strip text of console escape formatting and color codes
 * @example
 * strip('this should be plain text!')
 */
// eslint-disable-next-line no-control-regex
export const strip: FormatFN = arg => arg.replace(/\x1b[[(?);]{0,2}(;?\d)*./g, '')
