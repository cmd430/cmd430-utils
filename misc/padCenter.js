export function padCenter (str, maxLen) {
  return str.padStart((str.length + maxLen) / 2).padEnd(maxLen)
}
