import { inspect } from 'node:util'
import { isArray, isObject, isDate, isError } from '../misc.js'

export const parse = ({ colors, showHidden }, ...args) => args.map(arg => {
  const shouldInspect = (isObject(arg) || isArray(arg) || isDate(arg))

  if (shouldInspect || (showHidden && isError(arg))) return inspect(arg, {
    showHidden: showHidden,
    depth: null,
    colors: colors
  })

  return arg
}).join(' ')
