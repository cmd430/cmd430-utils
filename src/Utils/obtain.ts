export abstract class SmartResponse <T = any> extends Response {
  public abstract get data (): T | undefined
}

export async function obtain <T = any> (...[ input, init ]: Parameters<typeof fetch>): Promise<SmartResponse<T>> {
  const res = await fetch(input, init)

  const contentType = res.headers.get('content-type')

  if (contentType?.includes('json')) {
    Object.defineProperty(res, 'data', {
      enumerable: true,
      writable: false,
      value: await res.clone().json() as T
    })
  }

  if (contentType?.includes('text')) {
    Object.defineProperty(res, 'data', {
      enumerable: true,
      writable: false,
      value: await res.clone().text()
    })
  }

  return res as SmartResponse<T>
}
