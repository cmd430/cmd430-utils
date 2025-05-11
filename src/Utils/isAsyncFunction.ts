import { isType } from './isType'

/**
 * Check if a given object is an Async Function
 */
export function isAsyncFunction (object: any): boolean {
  return isType('AsyncFunction', object)
}
