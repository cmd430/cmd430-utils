import { isType } from './isType'

/**
 * Check if a given object is an Error
 */
export function isError (object: any): boolean {
  return isType('Error', object)
}
