import { isType } from './isType'

/**
 * Check if a given object is a Function
 */
export function isFunction (object: any): boolean {
  return isType('Function', object)
}
