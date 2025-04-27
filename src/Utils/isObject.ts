import { isType } from './isType'

export function isObject (object: any): boolean{
  return isType('Object', object)
}
