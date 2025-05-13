import {
  colors,
  cyan,
  grey,
  magenta,
  parse,
  red,
  timestamp,
  white,
  yellow
} from "./chunk-UJJX4ZW2.js";
import {
  isDevEnv,
  isString,
  padCenter
} from "./chunk-JYAUZJLB.js";

// src/Log/Colors/random.ts
import { randomInt } from "node:crypto";
var colors2 = Object.fromEntries(Object.entries(await import("./colors-WNWGDHSQ.js")));
var random = (...args) => Object.values(colors2)[randomInt(Object.keys(colors2).length)](...args);

// src/Log/Colors/rgb.ts
var rgb = (color, ...args) => {
  const r = ("r" in color ? color.r : color[0]) ?? 0;
  const g = ("g" in color ? color.g : color[1]) ?? 0;
  const b = ("b" in color ? color.b : color[2]) ?? 0;
  return `\x1B[38;2;${r};${g};${b}m${parse({ colors: false }, ...args)}\x1B[0m`;
};

// src/Log/Formatting/bold.ts
var bold = (...args) => `\x1B[1m${parse({ colors: false }, ...args)}\x1B[22m`;

// src/Log/Formatting/html.ts
var html = (arg) => {
  for (const { groups } of arg.matchAll(/(?<full>\x1b[[(?);]{0,2}(?<code>;?\d*).)/g)) {
    const { full, code } = groups;
    switch (code) {
      case "1": {
        arg = arg.replaceAll(full, "<b>");
        break;
      }
      case "22": {
        arg = arg.replaceAll(full, "</b>");
        break;
      }
      case "3": {
        arg = arg.replaceAll(full, "<i>");
        break;
      }
      case "23": {
        arg = arg.replaceAll(full, "</i>");
        break;
      }
      case "4": {
        arg = arg.replaceAll(full, "<u>");
        break;
      }
      case "24": {
        arg = arg.replaceAll(full, "</u>");
        break;
      }
      case "32": {
        arg = arg.replaceAll(full, '<span style="color: rgb(139, 180, 62)">');
        break;
      }
      case "33": {
        arg = arg.replaceAll(full, '<span style="color: rgb(179, 182, 63)">');
        break;
      }
      case "35": {
        arg = arg.replaceAll(full, '<span style="color: rgb(150, 121, 202)">');
        break;
      }
      case "90": {
        arg = arg.replaceAll(full, '<span style="color: rgb(145, 145, 145)">');
        break;
      }
      case "91": {
        arg = arg.replaceAll(full, '<span style="color: rgb(205, 64, 38)">');
        break;
      }
      case "92": {
        arg = arg.replaceAll(full, '<span style="color: rgb(131, 212, 70)">');
        break;
      }
      case "93": {
        arg = arg.replaceAll(full, '<span style="color: rgb(223, 199, 63)">');
        break;
      }
      case "95": {
        arg = arg.replaceAll(full, '<span style="color: rgb(171, 127, 250)">');
        break;
      }
      case "96": {
        arg = arg.replaceAll(full, '<span style="color: rgb(121, 212, 237)">');
        break;
      }
      case "97": {
        arg = arg.replaceAll(full, '<span style="color: rgb(255, 255, 255)">');
        break;
      }
      case "39":
      // default
      case "0": {
        arg = arg.replaceAll(full, "</span>");
        break;
      }
      default: {
        arg = arg.replaceAll(full, "");
      }
    }
  }
  return arg;
};

// src/Log/Formatting/italic.ts
var italic = (...args) => `\x1B[3m${parse({ colors: false }, ...args)}\x1B[23m`;

// src/Log/Formatting/strip.ts
var strip = (arg) => arg.replace(/\x1b[[(?);]{0,2}(;?\d)*./g, "");

// src/Log/Formatting/underline.ts
var underline = (...args) => `\x1B[4m${parse({ colors: false }, ...args)}\x1B[24m`;

// src/Classes/Logger.ts
var timestamp2 = () => grey(`[${timestamp()}]`);
var filterMessage = (args) => args.filter((a) => a);
var paddedTag = (tag, length = 7, start = false) => start ? tag.padStart(length) : tag.padEnd(length);
var Logger = class _Logger {
  static _maxTagLength = 0;
  _tag;
  _timestamps;
  _alignment;
  _colors;
  _showHidden;
  _devOnly;
  /**
   * Creates a new Logger instance
   *
   * @example
   * const { log, info, warn, error, debug } = new Logger()
   *
   * @example
   * const { log, info, warn, error, debug } = new Logger('Tagged Log')
   */
  constructor(tag, tagOpts) {
    this.debug = this.debug.bind(this);
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this._tag = tag?.trim() ?? "";
    this._timestamps = tagOpts?.timestamps ?? true;
    this._alignment = tagOpts?.alignment ?? "center";
    this._colors = tagOpts?.colors ?? colors();
    this._showHidden = tagOpts?.showHidden ?? false;
    this._devOnly = tagOpts?.devOnly ?? false;
    if (this._tag) this._tag = `[ ${this._tag} ]`;
    if (this._tag && this._tag.length > _Logger._maxTagLength) _Logger._maxTagLength = this._tag.length;
  }
  _logTag() {
    if (this._devOnly === true && isDevEnv() === false) return "";
    if (this._tag && this._alignment === "left") {
      return white(paddedTag(this._tag, _Logger._maxTagLength));
    }
    if (this._tag && this._alignment === "center") {
      return white(padCenter(this._tag, _Logger._maxTagLength));
    }
    if (this._tag && this._alignment === "ceter-padded") {
      return white(`[${padCenter(this._tag.slice(1, -1), _Logger._maxTagLength - 2)}]`);
    }
    if (this._tag && this._alignment === "right") {
      return white(paddedTag(this._tag, _Logger._maxTagLength, true));
    }
    if (this._tag && this._alignment === "none") {
      return white(this._tag);
    }
    return this._alignment === "none" ? "" : paddedTag("", _Logger._maxTagLength);
  }
  _msg(type, color, ...args) {
    return console[type](...filterMessage([
      this._timestamps ? timestamp2() : "",
      this._logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({
        colors: true,
        showHidden: type === "debug" ? true : this._showHidden
      }, ...args)
    ]).map((arg) => isString(arg) && this._colors === false ? strip(arg) : arg));
  }
  /**
   * Print a message tagged as [LOG]
   */
  log(...args) {
    return this._msg("log", white, ...args);
  }
  /**
   * Print a message tagged as [INFO]
   */
  info(...args) {
    return this._msg("info", cyan, ...args);
  }
  /**
   * Print a message tagged as [WARN]
   */
  warn(...args) {
    return this._msg("warn", yellow, ...args);
  }
  /**
   * Print a message tagged as [ERROR]
   */
  error(...args) {
    return this._msg("error", red, ...args);
  }
  /**
   * Print a message tagged as [DEBUG]
   */
  debug(...args) {
    return isDevEnv() ? this._msg("debug", magenta, ...args) : void 0;
  }
};

// src/Classes/Emitter.ts
import { randomUUID } from "node:crypto";
var Emitter = class {
  _events = /* @__PURE__ */ new Map();
  _eventIds = /* @__PURE__ */ new Map();
  /**
   * Adds an event lister for `event` with a `handler` that is called on the event
   */
  on(event, handler) {
    const ids = this._eventIds.get(event) ?? /* @__PURE__ */ new Set();
    const id = randomUUID();
    this._eventIds.set(event, ids.add(id));
    this._events.set(id, handler);
  }
  /**
   * Adds an event lister for `event` with a `handler` that is called on the event
   * but is automatically removed after the event fires once
   */
  once(event, handler) {
    const ids = this._eventIds.get(event) ?? /* @__PURE__ */ new Set();
    const id = randomUUID();
    this._eventIds.set(event, ids.add(id));
    const onceHandler = (data) => {
      handler(data);
      this.off(event, onceHandler);
    };
    this._events.set(id, onceHandler);
  }
  /**
   * Removes an event lister for `event` with `handler`
   */
  off(event, handler) {
    const ids = this._eventIds.get(event);
    const [id] = this._events.entries().find(([_, value]) => value === handler) ?? [];
    this._events.delete(id);
    ids?.delete(id);
    if (ids && ids.size > 0) {
      this._eventIds.set(event, ids);
    } else {
      this._eventIds.delete(event);
    }
  }
  /**
   * - Checks if an event lister for `event` with a `handler` is set
   * - If `hander` is omitted checks if any `hander` for `event is set
   */
  has(event, handler) {
    const ids = this._eventIds.get(event);
    if (ids == null || ids.size === 0) return false;
    if (handler == null) return true;
    for (const id of ids) {
      if (this._events.get(id) === handler) return true;
    }
    return false;
  }
  /**
   * Removes all event listers for `event`
   */
  clear(event) {
    const ids = this._eventIds.get(event);
    ids?.forEach((id) => this._events.delete(id));
    this._eventIds.delete(event);
  }
  /**
   * Fires `event` with optional `data`
   */
  emit(event, data) {
    const ids = this._eventIds.get(event);
    ids?.forEach((id) => this._events.get(id)?.(data));
  }
};

// src/Classes/CircularBuffer.ts
var CircularBuffer = class {
  _buffer;
  _pointer = 0;
  _maxLength;
  /**
   * Creates a new CircularBuffer with `bufferSize` max items.
   */
  constructor(bufferSize) {
    this._maxLength = bufferSize;
    this._buffer = new Array(bufferSize);
  }
  /**
   * Appends new elements to the end of the CircularBuffer
   */
  push(item) {
    if (this._buffer.length === this._maxLength) {
      this._buffer[this._pointer] = item;
    } else {
      this._buffer.push(item);
    }
    this._pointer = (this._pointer + 1) % this._maxLength;
  }
  /**
   * Returns the item located at the specified index. oldest first.
   */
  at(index) {
    const isPositive = 1 / (index * 0) === 1 / 0;
    const absIndex = Math.abs(index);
    if (absIndex >= this._maxLength) return void 0;
    if (isPositive) return this._buffer[(this._pointer + absIndex) % this._maxLength];
    return this._buffer[(this._pointer + (this._maxLength - 1) - absIndex) % this._maxLength];
  }
  /**
   * Determines whether a CircularBuffer includes a certain item, returning true or false as appropriate.
   */
  contains(value) {
    return this.toArray().includes(value);
  }
  /**
   * Creates an array from a CircularBuffer.
   */
  toArray() {
    const result = [];
    for (let i = 0; i < this._maxLength; i++) {
      const item = this._buffer[(this._pointer + i) % this._maxLength];
      if (item == null) continue;
      result.push(item);
    }
    return result.filter(Boolean);
  }
  /**
   * Returns a string representation of a CircularBuffer.
   */
  toString() {
    return this.toArray().toString();
  }
};

// src/Classes/ConsoleLogger.ts
import { inspect } from "node:util";
import { existsSync, unlinkSync, appendFileSync } from "node:fs";
import { resolve } from "node:path";
var ConsoleLogger = class _ConsoleLogger {
  static _console = {
    log: globalThis.console.log,
    info: globalThis.console.info,
    warn: globalThis.console.warn,
    error: globalThis.console.error,
    debug: globalThis.console.debug,
    group: globalThis.console.group,
    groupEnd: globalThis.console.groupEnd
  };
  static _enabled = false;
  static _dirPath = ".";
  static _stdOut = "stdout.log";
  static _stdErr = "stderr.log";
  /**
   * Clear/Delete the log files if they exist
   */
  static clear() {
    const stdOut = _ConsoleLogger.stdOutPath;
    const stdErr = _ConsoleLogger.stdErrPath;
    if (existsSync(stdOut)) unlinkSync(stdOut);
    if (existsSync(stdErr)) unlinkSync(stdErr);
  }
  static get stdOutPath() {
    return resolve(_ConsoleLogger._dirPath, _ConsoleLogger._stdOut);
  }
  static get stdErrPath() {
    return resolve(_ConsoleLogger._dirPath, _ConsoleLogger._stdErr);
  }
  static _write(type, args) {
    const path = type === "error" ? _ConsoleLogger.stdErrPath : _ConsoleLogger.stdOutPath;
    _ConsoleLogger._console[type](...args);
    return appendFileSync(path, `${args.map((arg) => strip(typeof arg === "string" ? arg : inspect(arg, {
      colors: false,
      depth: 10
    }))).join(" ")}
`, "utf8");
  }
  /**
   * Enable writing console.<log|info|warn|error|debug|group|groupEnd> to log files
   */
  static enable() {
    if (_ConsoleLogger.enabled) return;
    globalThis.console.log = (...args) => _ConsoleLogger._write("log", args);
    globalThis.console.info = (...args) => _ConsoleLogger._write("info", args);
    globalThis.console.warn = (...args) => _ConsoleLogger._write("warn", args);
    globalThis.console.error = (...args) => _ConsoleLogger._write("error", args);
    globalThis.console.debug = (...args) => _ConsoleLogger._write("debug", args);
    globalThis.console.group = (...args) => _ConsoleLogger._write("group", args);
    globalThis.console.groupEnd = (...args) => _ConsoleLogger._write("groupEnd", args);
    _ConsoleLogger._enabled = true;
  }
  /**
   * Disable writing console.<log|info|warn|error|debug|group|groupEnd> to log files
   */
  static disable() {
    if (_ConsoleLogger.enabled === false) return;
    globalThis.console.log = _ConsoleLogger._console.log;
    globalThis.console.info = _ConsoleLogger._console.info;
    globalThis.console.warn = _ConsoleLogger._console.warn;
    globalThis.console.error = _ConsoleLogger._console.error;
    globalThis.console.debug = _ConsoleLogger._console.debug;
    globalThis.console.group = _ConsoleLogger._console.group;
    globalThis.console.groupEnd = _ConsoleLogger._console.groupEnd;
    _ConsoleLogger._enabled = false;
  }
  /**
   * Toggle writing console.<log|info|warn|error|debug|group|groupEnd> to log files
   */
  static toggle() {
    if (_ConsoleLogger.enabled) {
      return _ConsoleLogger.disable();
    }
    return _ConsoleLogger.enable();
  }
  /**
   * Set the directory path for the log files
   */
  static setDir(dirpath) {
    _ConsoleLogger._dirPath = dirpath;
  }
  /**
   * File names for the two log files (stdout, stderr)
   */
  static setNames(stdout, stderr) {
    _ConsoleLogger._stdOut = stdout;
    _ConsoleLogger._stdErr = stderr;
  }
  /**
   * Check if writing the log files is enabled or not
   */
  static get enabled() {
    return _ConsoleLogger._enabled;
  }
};

export {
  random,
  rgb,
  bold,
  html,
  italic,
  strip,
  underline,
  Logger,
  Emitter,
  CircularBuffer,
  ConsoleLogger
};
