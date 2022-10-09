import { isType } from './isType.js'

export function isFunction (obj) {
  return isType('Function', obj)
}
