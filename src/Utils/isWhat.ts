import type { ObjectType } from './isType'

/**
 * Return type of a given object
 */
export function isWhat (object: any): ObjectType {
  return Object.prototype.toString.call(object).match(/\[object (?<type>\w+)\]/)!.groups!.type as ObjectType
}
