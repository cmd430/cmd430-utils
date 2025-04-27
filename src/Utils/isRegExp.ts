import { isType } from './isType'

export function isRegExp (object: any): boolean {
  return isType('RegExp', object)
}
