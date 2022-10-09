import { isType } from './isType.js'

export function isBoolean (obj) {
  return isType('Boolean', obj)
}
