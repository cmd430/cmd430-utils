import { isType } from './isType'

export function isArray (object: any): boolean {
  return isType('Array', object)
}

