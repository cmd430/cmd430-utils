import { isType } from './isType.js'

export function isObject (obj) {
  return isType('Object', obj)
}
