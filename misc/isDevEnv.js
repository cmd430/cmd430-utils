export function isDevEnv () {
  return (process.env.NODE_ENV?.startsWith('prod') ?? false) === false
}
