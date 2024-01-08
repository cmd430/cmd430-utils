import { env, platform } from 'node:process'

export function formatting () {
  // super basic color support check

  if ('NO_COLOR' in env) return false
  if ((/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i).test(env.TERM)) return true
  if ('COLORTERM' in env) return true
  if (platform === 'win32') return true

  return false
}
