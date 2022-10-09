import { inspect } from 'node:util'
import { isArray, isObject, isDate } from '../misc.js'

export const parse = ({ colors }, ...args) => args.map(arg => {
  if (isObject(arg) || isArray(arg) || isDate(arg)) return inspect(arg, {
    showHidden: false,
    depth: null,
    colors: colors
  })

  return arg
}).join(' ')
