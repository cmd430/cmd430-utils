import { isType } from './isType.js'

export function isUndefined (obj) {
  return isType('Undefined', obj)
}
