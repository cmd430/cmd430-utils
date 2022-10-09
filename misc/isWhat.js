export function isWhat (obj) {
  return Object.prototype.toString.call(obj).match(/\[object (?<type>\w+)\]/).groups.type
}
