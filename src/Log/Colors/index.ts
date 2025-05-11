import type { NumberRange } from '../../Types'

export type ColorFN = (...args: any[]) => string
export type RGBColorFN = (color: RGBArgs, ...args: any[]) => string

type RGBArgs = {
  r: NumberRange<0, 256>
  g: NumberRange<0, 256>
  b: NumberRange<0, 256>
} | [
  NumberRange<0, 256>,
  NumberRange<0, 256>,
  NumberRange<0, 256>
]

export * from './colors'
export { random } from './random'
export { rgb } from './rgb'
