import { isType } from './isType'

/**
 * Check if a given object is an Object
 */
export function isObject (object: any): boolean{
  return isType('Object', object)
}
