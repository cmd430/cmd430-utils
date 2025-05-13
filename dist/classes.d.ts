export { C as ConsoleLogger, L as Logger } from './ConsoleLogger-B9t-CK12.js';
import './Colors-DfJAe6id.js';

type Handler<Data = any> = (data: Data) => void;
/**
 * Emitter
 * - Pass an `EventMap` for strongly typed events
 * - Ommit passing an `EventMap` to have `string: any` event types
 */
declare class Emitter<EventMap = {
    [E: string]: any;
}> {
    private _events;
    private _eventIds;
    /**
     * Adds an event lister for `event` with a `handler` that is called on the event
     */
    on<Event extends keyof EventMap & string, Data = EventMap[Event]>(event: Event, handler: Handler<Data>): void;
    /**
     * Adds an event lister for `event` with a `handler` that is called on the event
     * but is automatically removed after the event fires once
     */
    once<Event extends keyof EventMap & string, Data = EventMap[Event]>(event: Event, handler: Handler<Data>): void;
    /**
     * Removes an event lister for `event` with `handler`
     */
    off<Event extends keyof EventMap & string, Data = EventMap[Event]>(event: Event, handler: Handler<Data>): void;
    /**
     * - Checks if an event lister for `event` with a `handler` is set
     * - If `hander` is omitted checks if any `hander` for `event is set
     */
    has<Event extends keyof EventMap & string, Data = EventMap[Event]>(event: Event, handler?: Handler<Data>): boolean;
    /**
     * Removes all event listers for `event`
     */
    clear<Event extends keyof EventMap & string>(event: Event): void;
    /**
     * Fires `event` with optional `data`
     */
    emit<Event extends keyof EventMap & string, Data = EventMap[Event]>(event: Event, data?: Data): void;
}

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
declare class CircularBuffer<T extends string | boolean | number> {
    private _buffer;
    private _pointer;
    private _maxLength;
    /**
     * Creates a new CircularBuffer with `bufferSize` max items.
     */
    constructor(bufferSize: number);
    /**
     * Appends new elements to the end of the CircularBuffer
     */
    push(item: T): void;
    /**
     * Returns the item located at the specified index. oldest first.
     */
    at(index: number): T | undefined;
    /**
     * Determines whether a CircularBuffer includes a certain item, returning true or false as appropriate.
     */
    contains(value: T): boolean;
    /**
     * Creates an array from a CircularBuffer.
     */
    toArray(): T[];
    /**
     * Returns a string representation of a CircularBuffer.
     */
    toString(): string;
}

export { CircularBuffer, Emitter };
