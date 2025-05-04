class SmartResponse <T = any> extends Response {

  private _contentType: string | null
  private _data: Promise<T> | Promise<void> = Promise.resolve()

  constructor (...[ body, options ]: ConstructorParameters<typeof Response>) {
    super(body, options)

    this._contentType = this.headers.get('content-type')

    if (this._contentType?.includes('json')) {
      this._data = this.clone().json() as Promise<T>
    }
    if (this._contentType?.includes('text')) {
      this._data = this.clone().text() as Promise<T>
    }
  }

  public get data (): Promise<T> | Promise<void> {
    return this._data
  }

}

export async function obtain <T = any> (...[ input, init ]: Parameters<typeof fetch>) {
  const res = await fetch(input, init)

  return new SmartResponse<T>(res.body, res)
}
