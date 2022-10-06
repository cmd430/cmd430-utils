const { inspect } = require('node:util')
const { isArray, isObject, isType } = require('../../misc')

module.exports = ({ colors }, ...args) => args.map(arg => {
  if (isObject(arg) || isArray(arg) || isType('Date', arg)) return inspect(arg, {
    showHidden: false,
    depth: null,
    colors: colors
  })

  return arg
}).join(' ')
