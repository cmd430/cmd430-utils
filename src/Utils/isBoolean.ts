import { isType } from './isType'

export function isBoolean (object: any): boolean {
  return isType('Boolean', object)
}
