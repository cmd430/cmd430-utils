import { isType } from './isType'

/**
 * Check if a given object is Null
 */
export function isNull (object: any): boolean {
  return isType('Null', object)
}
