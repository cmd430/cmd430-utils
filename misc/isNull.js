import { isType } from './isType.js'

export function isNull (obj) {
  return isType('Null', obj)
}
