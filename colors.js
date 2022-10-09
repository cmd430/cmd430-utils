import { cyan } from './colors/cyan.js'
import { green } from './colors/green.js'
import { grey } from './colors/grey.js'
import { magenta } from './colors/magenta.js'
import { red } from './colors/red.js'
import { white } from './colors/white.js'
import { yellow } from './colors/yellow.js'

const random = (...args) => {
  const colors = [ cyan, green, grey, magenta, red, white, yellow ]

  return colors[Math.floor(Math.random() * colors.length)](...args)
}

export {
  cyan,
  green,
  grey,
  magenta,
  random,
  red,
  white,
  yellow
}
