/**
 * A fixed size Array new items exceeding the size size overwrite the oldest item in the CircularBuffer.
 *
 * @example
 * const circularBuffer = new CircularBuffer(3)
 * circularBuffer.push('a')
 * circularBuffer.push('b')
 * circularBuffer.push('c')
 * circularBuffer.push('d')
 *
 * console.log(circularBuffer.contains('a'))
 * // returns false
 *
 * console.log(circularBuffer.toArray())
 * // returns [ 'b', 'c', 'd' ]
 */
export class CircularBuffer <T extends string | boolean | number> {

  private _buffer: T[]
  private _pointer: number = 0
  private _maxLength: number

  /**
   * Creates a new CircularBuffer with `bufferSize` max items.
   */
  constructor (bufferSize: number) {
    this._maxLength = bufferSize
    this._buffer = new Array(bufferSize)
  }

  /**
   * Appends new elements to the end of the CircularBuffer
   */
  public push (item: T): void {
    if (this._buffer.length === this._maxLength) {
      this._buffer[this._pointer] = item
    } else {
      this._buffer.push(item)
    }
    this._pointer = (this._pointer + 1) % this._maxLength
  }

  /**
   * Returns the item located at the specified index. oldest first.
   */
  public at (index: number): T | undefined {
    const isPositive = 1 / (index * 0) === 1 / 0
    const absIndex = Math.abs(index)

    if (absIndex >= this._maxLength) return undefined

    // from start (oldest first)
    if (isPositive) return this._buffer[(this._pointer + absIndex) % this._maxLength]

    // from end (newest first)
    return this._buffer[((this._pointer + (this._maxLength - 1)) - absIndex) % this._maxLength]
  }

  /**
   * Determines whether a CircularBuffer includes a certain item, returning true or false as appropriate.
   */
  public contains (value: T): boolean {
    return this.toArray().includes(value)
  }

  /**
   * Creates an array from a CircularBuffer.
   */
  public toArray (): T[] {
    const result: T[] = []

    for (let i = 0; i < this._maxLength; i++) {
      const item = this._buffer[(this._pointer + i) % this._maxLength]

      if (item == null) continue

      result.push(item)
    }

    return result.filter(Boolean)
  }

  /**
   * Returns a string representation of a CircularBuffer.
   */
  public toString (): string {
    return this.toArray().toString()
  }

}
