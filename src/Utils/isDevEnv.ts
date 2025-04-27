import { env } from 'node:process'

export function isDevEnv (): boolean {
  return (env.NODE_ENV?.startsWith('prod') ?? false) === false
}
