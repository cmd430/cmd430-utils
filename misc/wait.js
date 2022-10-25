import { setTimeout } from 'node:timers/promises'

export function wait ({ minutes = 0, seconds = 0, milliseconds = 0 }) {
  return setTimeout((1000 * 60 * minutes) + (1000 * seconds) + milliseconds)
}
