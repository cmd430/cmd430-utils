export function padCenter (str: string, maxLen: number): string {
  return str.padStart((str.length + maxLen) / 2).padEnd(maxLen)
}
