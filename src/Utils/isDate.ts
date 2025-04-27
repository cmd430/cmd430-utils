import { isType } from './isType'

export function isDate (object: any): boolean {
  return isType('Date', object)
}
