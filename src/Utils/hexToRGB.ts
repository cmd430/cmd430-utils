import type { ColorHexString, ColorRGB, NumberRange } from '../Types'

/**
 * Return an object of `r,g,b` from a hex color string
 */
export function hexToRgb (hex: ColorHexString): ColorRGB {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const hexNumbers = hex.replace(shorthandRegex, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}}`)
  const matched = hexNumbers.match(/^#?(?<r>[a-f\d]{2})(?<g>[a-f\d]{2})(?<b>[a-f\d]{2})$/i)

  if (!matched) throw new Error('invalid input')

  const { r, g, b } = matched.groups as { r: string, g: string, b: string }

  return {
    r: <NumberRange<0, 256>>parseInt(r, 16),
    g: <NumberRange<0, 256>>parseInt(g, 16),
    b: <NumberRange<0, 256>>parseInt(b, 16)
  }
}
