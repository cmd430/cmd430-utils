import { isType } from './isType.js'

export function isString (obj) {
  return isType('String', obj)
}
