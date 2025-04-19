export function omit (obj, ...keys) {
  return keys.reduce((filtered, key) => {
    // eslint-disable-next-line no-unused-vars
    const { [key]: omitted, ...rest } = filtered
    return rest
  }, obj)
}
