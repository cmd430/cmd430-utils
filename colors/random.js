import { readdir } from 'node:fs/promises'
import { randomInt } from 'node:crypto'
import { __dirname } from '../misc/__dirname.js'

async function getColors () {
  const colorFiles = await readdir(__dirname())
  const colorNames = colorFiles.map(c => (c = c.slice(0, -3))).filter(c => c !== 'random')

  return colorNames
}

const colors = await getColors()

for (const color of colors) {
  colors[color] = Object.values(await import(`./${color}.js`))[0]
}

export const random = (...args) => colors[colors[randomInt(colors.length)]](...args)
