import type { ObjectType } from './isType'

export function isWhat (object: any): ObjectType {
  return Object.prototype.toString.call(object).match(/\[object (?<type>\w+)\]/)!.groups!.type as ObjectType
}
