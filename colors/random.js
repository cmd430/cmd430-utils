import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdir } from 'node:fs/promises'

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/* eslint-enable no-underscore-dangle */

async function getColors () {
  const colorFiles = await readdir(__dirname)
  const colorNames = colorFiles.map(c => (c = c.slice(0, -3))).filter(c => c !== 'random')

  return colorNames
}

const colors = await getColors()

for (const color of colors) {
  colors[color] = Object.values(await import(`./${color}.js`))[0]
}

export const random = (...args) => colors[colors[Math.floor(Math.random() * colors.length)]](...args)
