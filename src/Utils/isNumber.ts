import { isType } from './isType'

export function isNumber (object: any): boolean {
  return isType('Number', object)
}
