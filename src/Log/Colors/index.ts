import type { RGBArgs } from '../../Types'

export type ColorFN = (...args: any[]) => string
export type RGBColorFN = (color: RGBArgs, ...args: any[]) => string

export * from './colors'
export { random } from './random'
export { rgb } from './rgb'
