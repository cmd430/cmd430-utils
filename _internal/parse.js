import { inspect } from 'node:util'
import { isArray, isObject, isDate, isError } from '../misc.js'

export const parse = ({ colors, showHidden }, ...args) => args.map(arg => {
  if (isObject(arg) || isArray(arg) || isDate(arg) || isError(arg)) return inspect(arg, {
    showHidden: showHidden,
    depth: null,
    colors: colors
  })

  return arg
}).join(' ')
