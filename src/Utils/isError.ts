import { isType } from './isType'

export function isError (object: any): boolean {
  return isType('Error', object)
}
