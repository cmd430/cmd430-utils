import { argv } from 'node:process'

const parseArgBool: (argValue: string | undefined) => boolean | string = argValue => {
  const argValueLower = argValue?.toLowerCase()

  if (argValueLower === 'false') return false
  if (argValueLower === 'true') return true
  if (argValueLower != null) return argValue as string

  return true
}

export function parseArgs (): Args {
  return argv.slice(2).reduce((args, arg) => {
    const isLong = arg.slice(0, 2) === '--'
    const isArray = isLong && (/^--\w+\[\]=/).test(arg)
    const isShort = !isLong && arg.slice(0, 1) === '-'

    // long string or boolean args
    if (isLong && isArray === false) {
      const [ flag, value ] = arg.slice(2).split('=')

      args[flag as keyof Args] ??= parseArgBool(value)
    }

    // short boolean args
    if (isShort) arg.slice(1).split('').forEach(flag => (args[flag] ??= true))

    // array args
    if (isArray) {
      const [ flag, value ] = arg.slice(2).split('[]=')

      ;(args[flag as keyof Args] as string []) ??= [] as string[]
      ;(args[flag as keyof Args] as string []).push(value as string)
    }

    return args
  }, {} as Args)
}

export interface Args {
  [flag: string]: string | string[] | boolean
}

