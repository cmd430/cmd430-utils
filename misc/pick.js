export function pick (obj, ...keys) {
  return keys.reduce((acc, key) => {
    return (acc = Object.assign(acc, { [key]: obj[key] }))
  }, {})
}
