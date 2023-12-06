import { env } from 'node:process'

export function isDevEnv () {
  return (env.NODE_ENV?.startsWith('prod') ?? false) === false
}
