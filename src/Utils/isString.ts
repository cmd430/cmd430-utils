import { isType } from './isType'

export function isString (object: any): boolean {
  return isType('String', object)
}
