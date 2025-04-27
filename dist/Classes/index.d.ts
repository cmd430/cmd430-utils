export { L as Logger } from '../Logger-hEnMlb33.js';

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

export { Emitter };
