/**
 * Check if a given object is of <type>
 */
export function isType (type: ObjectType, object: any): boolean {
  return Object.prototype.toString.call(object) === `[object ${type}]`
}

export type ObjectType = 'Array' | 'AsyncFunction' | 'Boolean' | 'Date' | 'Error' | 'Function' | 'Null' | 'Number' | 'Object' | 'RegExp' | 'String' | 'Undefined'
