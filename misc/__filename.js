import { fileURLToPath } from 'node:url'
import { callsites } from '../_internal/callsites.js'

// eslint-disable-next-line no-underscore-dangle
export function __filename () {
  return fileURLToPath(callsites().filter(c => c.getFileName()?.startsWith('file:///')).pop().getFileName())
}
