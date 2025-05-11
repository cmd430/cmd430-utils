import { isType } from './isType'

/**
 * Check if a given object is an Array
 */
export function isArray (object: any): boolean {
  return isType('Array', object)
}

