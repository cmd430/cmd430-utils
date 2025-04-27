import { isType } from './isType'

export function isFunction (object: any): boolean {
  return isType('Function', object)
}
