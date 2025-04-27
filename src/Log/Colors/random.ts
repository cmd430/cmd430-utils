import type { ColorFN } from '.'
import { randomInt } from 'node:crypto'

const colors: Colors = Object.fromEntries(Object.entries(await import('./colors')))

export const random: ColorFN = (...args) => Object.values(colors)[randomInt(Object.keys(colors).length)]!(...args)

interface Colors {
  [color: string]: ColorFN
}
