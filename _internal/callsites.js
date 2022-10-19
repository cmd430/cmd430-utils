export function callsites () {
  const prepareStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = (_, stack) => stack
  const stack = new Error().stack
  Error.prepareStackTrace = prepareStackTrace
  return stack
}
