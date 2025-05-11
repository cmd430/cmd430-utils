import { isType } from './isType'

/**
 * Check if a given object is Undefined
 */
export function isUndefined (object: any): boolean {
  return isType('Undefined', object)
}
