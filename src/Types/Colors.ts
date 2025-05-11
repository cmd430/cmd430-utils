import type { NumberRange } from './NumberRange'

export type ColorHexString = `#${string}${string}${string}${string}${string}${string}`
export interface ColorRGB {
  r: NumberRange<0, 256>,
  g: NumberRange<0, 256>,
  b: NumberRange<0, 256>
}

export type RGBArgs = {
  r: NumberRange<0, 256>
  g: NumberRange<0, 256>
  b: NumberRange<0, 256>
} | [
  NumberRange<0, 256>,
  NumberRange<0, 256>,
  NumberRange<0, 256>
]
