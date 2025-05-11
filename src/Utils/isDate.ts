import { isType } from './isType'

/**
 * Check if a given object is a Date
 */
export function isDate (object: any): boolean {
  return isType('Date', object)
}
