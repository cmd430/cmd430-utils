import { isType } from './isType.js'

export function isAsyncFunction (obj) {
  return isType('AsyncFunction', obj)
}
