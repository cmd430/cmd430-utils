import { fileURLToPath } from 'node:url'
import { callsites as getCallsites } from '../_internal/callsites.js'

// eslint-disable-next-line no-underscore-dangle
export function __filename ({ depth } = { depth: 0 }) {
  const callsites = getCallsites().filter(c => !c.isNative() && !c.getFileName().startsWith('node:internal'))
  const callsite = callsites[callsites.length - (1 + (depth > -1 ? depth : 0))].getFileName()

  return fileURLToPath(callsite.startsWith('file:///') ? callsite : `file:///${callsite}`)
}
