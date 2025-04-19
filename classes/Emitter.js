import { randomUUID } from 'node:crypto'

export class Emitter {

  #events = new Map()

  #eventIds = new Map()

  on (event, handler) {
    const ids = this.#eventIds.get(event) ?? new Set()
    const id = randomUUID()
    this.#eventIds.set(event, ids.add(id))
    this.#events.set(id, handler)
  }

  once (event, handler) {
    const ids = this.#eventIds.get(event) ?? new Set()
    const id = randomUUID()
    this.#eventIds.set(event, ids.add(id))
    const onceHandler = data => {
      handler(data)
      this.off(event, onceHandler)
    }
    this.#events.set(id, onceHandler)
  }

  off (event, handler) {
    const ids = this.#eventIds.get(event)
    const [ id ] = this.#events.entries().find(([ _, value ]) => value === handler) ?? []
    this.#events.delete(id)
    ids?.delete(id)
    if (ids && ids.size > 0) {
      this.#eventIds.set(event, ids)
    } else {
      this.#eventIds.delete(event)
    }
  }

  has (event, handler) {
    const ids = this.#eventIds.get(event)
    if (ids == null || ids.size === 0) return false
    if (handler == null) return true
    for (const id of ids) {
      if (this.#events.get(id) === handler) return true
    }
    return false
  }

  clear (event) {
    const ids = this.#eventIds.get(event)
    ids?.forEach(id => this.#events.delete(id))
    this.#eventIds.delete(event)
  }

  emit (event, data) {
    const ids = this.#eventIds.get(event)
    ids?.forEach(id => this.#events.get(id)?.(data))
  }
}
