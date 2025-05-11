import { isType } from './isType'

/**
 * Check if a given object is a String
 */
export function isString (object: any): boolean {
  return isType('String', object)
}
