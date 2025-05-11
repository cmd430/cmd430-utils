import { env } from 'node:process'

/**
 * Check if running in Prod or Dev (NODE_ENV)
 */
export function isDevEnv (): boolean {
  return (env.NODE_ENV?.startsWith('prod') ?? false) === false
}
