import { isType } from './isType.js'

export function isDate (obj) {
  return isType('Date', obj)
}
