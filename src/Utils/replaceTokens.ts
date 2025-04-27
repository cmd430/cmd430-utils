export function replaceTokens (string: string, tokens: TokenMap): string {
  for (const [ token, value ] of Object.entries(tokens)) {
    string = string.replaceAll(token, value)
  }

  return string
}

export interface TokenMap {
  [token: string]: string
}
