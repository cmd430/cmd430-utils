export function replaceTokens (string, tokens) {
  for (const [ token, value ] of Object.entries(tokens)) {
    string = string.replaceAll(token, value)
  }

  return string
}
