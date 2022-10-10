import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdir } from 'node:fs/promises'

const colors = (await readdir(dirname(fileURLToPath(import.meta.url)))).map(c => c = c.slice(0, -3)).filter(c => c !== 'random')

for (let color of colors) {
  colors[color] = Object.values(await import(`./${color}.js`))[0]
}

export const random = (...args) => colors[colors[Math.floor(Math.random() * colors.length)]](...args)
