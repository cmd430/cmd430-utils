import { randomUUID } from 'node:crypto'

export type Handler<Data = any> = (data: Data) => void

/**
 * Emitter
 * - Pass an `EventMap` for strongly typed events
 * - Ommit passing an `EventMap` to have `string: any` event types
 */
export class Emitter<EventMap = { [E: string]: any }> {

  private _events: Map<string, Handler> = new Map()
  private _eventIds: Map<string, Set<string>> = new Map()

  /**
   * Adds an event lister for `event` with a `handler` that is called on the event
   */
  public on <Event extends keyof EventMap & string, Data = EventMap[Event]> (event: Event, handler: Handler<Data>): void {
    const ids = this._eventIds.get(event) ?? new Set()
    const id = randomUUID()

    this._eventIds.set(event, ids.add(id))
    this._events.set(id, handler)
  }

  /**
   * Adds an event lister for `event` with a `handler` that is called on the event
   * but is automatically removed after the event fires once
   */
  public once <Event extends keyof EventMap & string, Data = EventMap[Event]> (event: Event, handler: Handler<Data>): void {
    const ids = this._eventIds.get(event) ?? new Set()
    const id = randomUUID()

    this._eventIds.set(event, ids.add(id))

    const onceHandler: Handler = data => {
      handler(data)
      this.off(event, onceHandler)
    }

    this._events.set(id, onceHandler)
  }

  /**
   * Removes an event lister for `event` with `handler`
   */
  public off <Event extends keyof EventMap & string, Data = EventMap[Event]> (event: Event, handler: Handler<Data>): void {
    const ids = this._eventIds.get(event)
    const [ id ] = this._events.entries().find(([ _, value ]: [ string, Handler ]) => value === handler) ?? []

    this._events.delete(id!)
    ids?.delete(id!)

    if (ids && ids.size > 0) {
      this._eventIds.set(event, ids)
    } else {
      this._eventIds.delete(event)
    }
  }

  /**
   * - Checks if an event lister for `event` with a `handler` is set
   * - If `hander` is omitted checks if any `hander` for `event is set
   */
  public has <Event extends keyof EventMap & string, Data = EventMap[Event]> (event: Event, handler?: Handler<Data>): boolean {
    const ids = this._eventIds.get(event)

    if (ids == null || ids.size === 0) return false
    if (handler == null) return true

    for (const id of ids) {
      if (this._events.get(id) === handler) return true
    }

    return false
  }

  /**
   * Removes all event listers for `event`
   */
  public clear <Event extends keyof EventMap & string> (event: Event): void {
    const ids = this._eventIds.get(event)

    ids?.forEach(id => this._events.delete(id))
    this._eventIds.delete(event)
  }

  /**
   * Fires `event` with optional `data`
   */
  public emit <Event extends keyof EventMap & string, Data = EventMap[Event]> (event: Event, data?: Data): void {
    const ids = this._eventIds.get(event)

    ids?.forEach(id => this._events.get(id)?.(data))
  }

}
