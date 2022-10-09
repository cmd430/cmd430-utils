import { isType } from './isType.js'

export function isRegExp (obj) {
  return isType('RegExp', obj)
}
