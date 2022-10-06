async function wait ({ minutes = 0, seconds = 0, milliseconds = 0 }) {
  const delay = (1000 * 60 * minutes) + (1000 * seconds) + milliseconds

  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

function isType (type, obj) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}

function isObject (obj) {
  return isType('Object', obj)
}

function isArray (obj) {
  return isType('Array', obj)
}

function isString (obj) {
  return isType('String', obj)
}

function isWhat (obj) {
  return Object.prototype.toString.call(obj).match(/\[object (?<type>\w+)\]/).groups.type
}

module.exports = { wait, isType, isObject, isArray, isString, isWhat }
