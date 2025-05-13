import type { RGBColorFN } from '../../Types'
import { parse } from '../Private'

/**
 * Color Text with RGB value
 * @example
 * rgb({ r: 255, g: 105, b: 180 }, 'this should be pink!')
 * rgb([ 0, 175, 255 ], 'this should be blue!')
 */
export const rgb: RGBColorFN = (color, ...args) => {
  const r = ('r' in color ? color.r : color[0]) ?? 0
  const g = ('g' in color ? color.g : color[1]) ?? 0
  const b = ('b' in color ? color.b : color[2]) ?? 0

  return `\x1b[38;2;${r};${g};${b}m${parse({ colors: false }, ...args)}\x1b[0m`
}
