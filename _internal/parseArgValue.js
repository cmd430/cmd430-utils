export const parseArgValue = argValue => {
  const argValueLower = argValue?.toLowerCase()

  if (argValueLower === 'false') return false
  if (argValueLower === 'true') return true

  return argValue
}
