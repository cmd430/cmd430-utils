import { isType } from './isType'

export function isNull (object: any): boolean {
  return isType('Null', object)
}
