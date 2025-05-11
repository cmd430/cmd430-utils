import type { ColorHexString, RGBArgs } from '../Types'

/**
 * Return a hex color string from RGB value
 */
export function rgbToHex (rgb: RGBArgs): ColorHexString {
  const r = ('r' in rgb ? rgb.r : rgb[0]) ?? 0
  const g = ('g' in rgb ? rgb.g : rgb[1]) ?? 0
  const b = ('b' in rgb ? rgb.b : rgb[2]) ?? 0

  return `#${(((1 << 24) | (r << 16)) | ((g << 8) | b)).toString(16).slice(1)}` as ColorHexString
}
