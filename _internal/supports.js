import { env, platform, stdout } from 'node:process'

export function formatting () {
  // super basic color support check

  if ((/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i).test(env.TERM)) return true
  if ('COLORTERM' in env) return true
  if (platform === 'win32') return true
  if (stdout.hasColors()) return true

  return false
}
