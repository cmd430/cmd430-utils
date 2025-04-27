import { isType } from './isType'

export function isAsyncFunction (object: any): boolean {
  return isType('AsyncFunction', object)
}
