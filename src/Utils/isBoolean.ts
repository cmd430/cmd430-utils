import { isType } from './isType'

/**
 * Check if a given object is a Boolean
 */
export function isBoolean (object: any): boolean {
  return isType('Boolean', object)
}
