import { inspect } from 'node:util'
import { isString } from '../../Utils'

export const parse: (opts: ParseOpts, ...args: any[]) => string = (opts, ...args) => args.map(arg => {
  const { colors, showHidden } = opts

  if (isString(arg)) return arg

  return inspect(arg, {
    showHidden: showHidden,
    depth: null,
    colors: colors
  })
}).join(' ')

interface ParseOpts {
  colors?: boolean
  showHidden?: boolean
}
