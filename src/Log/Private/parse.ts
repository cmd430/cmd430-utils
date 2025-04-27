import { inspect } from 'node:util'
import { isObject, isArray, isDate, isUndefined, isString, isError } from '../../Utils'

export const parse: (opts: ParseOpts, ...args: any[]) => string = (opts, ...args) => args.map(arg => {
  const { colors, showHidden, logType } = opts

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

interface ParseOpts {
  colors?: boolean
  showHidden?: boolean
  logType?: LogType
}

export type LogType = 'log' | 'info' | 'warn' | 'error' | 'debug'

