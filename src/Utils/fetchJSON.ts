/**
 * Return JSON data from fetch
 *
 * @deprecated use `obtain`
 */
export async function fetchJSON <T = any> (...[ input, init ]: Parameters<typeof fetch>): Promise<T> {
  const res = await fetch(input, init)

  return res.json() as T
}
