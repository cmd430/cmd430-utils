/**
 * Returns a string padded on the left and right until max length
 */
export function padCenter (str: string, maxLen: number, fillStr?: string): string {
  return str.padStart((str.length + maxLen) / 2, fillStr).padEnd(maxLen, fillStr)
}
