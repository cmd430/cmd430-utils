import { dirname } from 'node:path'
import { __filename } from './__filename.js'

// eslint-disable-next-line no-underscore-dangle
export function __dirname ({ depth } = { depth: 0 }) {
  return dirname(__filename({ depth }))
}
