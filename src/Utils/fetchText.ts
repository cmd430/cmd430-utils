export async function fetchText <T = string> (...[ input, init ]: Parameters<typeof fetch>): Promise<T> {
  const res = await fetch(input, init)

  return res.text() as T
}
