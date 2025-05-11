import { isType } from './isType'

/**
 * Check if a given object is a RegExp
 */
export function isRegExp (object: any): boolean {
  return isType('RegExp', object)
}
