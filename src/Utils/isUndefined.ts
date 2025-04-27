import { isType } from './isType'

export function isUndefined (object: any): boolean {
  return isType('Undefined', object)
}
