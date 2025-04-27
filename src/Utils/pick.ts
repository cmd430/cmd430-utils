export function pick <T extends object> (obj: T, ...keys: (keyof T & string)[]): Pick<T, keyof T> {
  return keys.reduce((acc: Pick<T, keyof T>, key: keyof T) => {
    return (acc = Object.assign(acc, { [key]: obj[key] }))
  }, {} as Pick<T, keyof T>)
}
