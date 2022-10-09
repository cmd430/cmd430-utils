export function isType (type, obj) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}
