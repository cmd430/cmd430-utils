import { dirname } from 'node:path'
import { __filename } from './__filename.js'

// eslint-disable-next-line no-underscore-dangle
export function __dirname () {
  return dirname(__filename())
}
