import { setTimeout } from 'node:timers/promises'

// maybe use this once/if it goes stable, https://nodejs.org/api/timers.html#timerspromisesschedulerwaitdelay-options

export function wait ({ minutes = 0, seconds = 0, milliseconds = 0 }) {
  return setTimeout((1000 * 60 * minutes) + (1000 * seconds) + milliseconds)
}
