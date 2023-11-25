import { inspect } from 'node:util'
import { isObject, isArray, isDate, isUndefined, isString, isError } from '../misc.js'

export const parse = ({ colors, showHidden, logType }, ...args) => args.map(arg => {
  const shouldInspect = (
    isObject(arg) ||
    isArray(arg) ||
    isDate(arg) ||
    isUndefined(arg)
  )

  if ((shouldInspect || showHidden) && !isString(arg)) return inspect(arg, {
    showHidden: showHidden,
    depth: null,
    colors: colors
  })

  return (isError(arg) && logType === 'error') ? arg.stack : arg
}).join(' ')
