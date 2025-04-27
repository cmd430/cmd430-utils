export function omit <T extends object> (obj: T, ...keys: (keyof T & string)[]): Omit<T, keyof T> {
  return keys.reduce((filtered: Omit<T, keyof T>, key: keyof T) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: omitted, ...rest } = filtered
    return rest
  }, obj)
}
