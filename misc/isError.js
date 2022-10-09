import { isType } from './isType.js'

export function isError (obj) {
  return isType('Error', obj)
}
