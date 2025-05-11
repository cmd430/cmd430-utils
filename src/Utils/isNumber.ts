import { isType } from './isType'

/**
 * Check if a given object is a Number
 */
export function isNumber (object: any): boolean {
  return isType('Number', object)
}
