import type { ColorFN } from '../../Types'
import { randomInt } from 'node:crypto'

const colors: Colors = Object.fromEntries(Object.entries(await import('./colors')))

/**
 * Color text a random color (cyan, green, grey, magenta, red, white, yellow)
 * @example
 * random('this should be colored!')
 */
export const random: ColorFN = (...args) => Object.values(colors)[randomInt(Object.keys(colors).length)]!(...args)

interface Colors {
  [color: string]: ColorFN
}
