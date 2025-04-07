import { argv } from 'node:process'

export function parseArgs () {
  return argv.slice(2).reduce((args, arg) => {
    const isLong = arg.slice(0, 2) === '--'
    const isArray = isLong && (/^--\w+\[\]=/).test(arg)
    const isShort = !isLong && arg.slice(0, 1) === '-'

    // long string or boolean args
    if (isLong && isArray === false) {
      const [ flag, value ] = arg.slice(2).split('=')

      args[flag] ??= value ?? true
    }

    // short boolean args
    if (isShort) arg.slice(1).split('').forEach(flag => (args[flag] ??= true))

    // array args
    if (isArray) {
      const [ flag, value ] = arg.slice(2).split('[]=')

      args[flag] ??= []
      args[flag].push(value)
    }

    return args
  }, {})
}
