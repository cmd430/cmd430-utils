import {
  cyan,
  formatting,
  grey,
  magenta,
  parse,
  red,
  timestamp,
  white,
  yellow
} from "./chunk-DFOB3YKS.js";
import {
  isDevEnv,
  isString,
  padCenter
} from "./chunk-WVDGOFXO.js";

// src/Log/Colors/random.ts
import { randomInt } from "node:crypto";
var colors = Object.fromEntries(Object.entries(await import("./colors-I7ESALLN.js")));
var random = (...args) => Object.values(colors)[randomInt(Object.keys(colors).length)](...args);

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
var paddedTag = (tag, length = 7) => tag.padEnd(length);
var Logger = class _Logger {
  static _maxTagLength = 0;
  _tag = "";
  _tagCenter = true;
  _tagCenterPadInner = true;
  _tagDevOnly = false;
  _formatting = true;
  _showHidden = false;
  constructor(tag, tagOpts) {
    this.debug = this.debug.bind(this);
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this._tag = tag?.trim() ?? "";
    this._tagCenter = tagOpts?.center ?? true;
    this._tagCenterPadInner = tagOpts?.centerPadInner ?? true;
    this._tagDevOnly = tagOpts?.devOnly ?? false;
    this._formatting = tagOpts?.formatting ?? formatting();
    this._showHidden = tagOpts?.showHidden ?? false;
    if (this._tag) this._tag = `[ ${this._tag} ]`;
    if (this._tag && this._tag.length > _Logger._maxTagLength) _Logger._maxTagLength = this._tag.length;
  }
  _logTag() {
    if (this._tagDevOnly === true && isDevEnv() === false) return "";
    if (this._tagCenter) {
      if (this._tagCenterPadInner) return this._tag ? white(`[${padCenter(this._tag.slice(1, -1), _Logger._maxTagLength - 2)}]`) : paddedTag("", _Logger._maxTagLength);
      return this._tag ? white(padCenter(this._tag, _Logger._maxTagLength)) : paddedTag("", _Logger._maxTagLength);
    }
    return this._tag ? white(paddedTag(this._tag, _Logger._maxTagLength)) : paddedTag("", _Logger._maxTagLength);
  }
  _msg(type, color, ...args) {
    return console[type](...filterMessage([
      timestamp2(),
      this._logTag(),
      color(paddedTag(`[${type.toUpperCase()}]`)),
      parse({
        colors: true,
        showHidden: type === "debug" ? true : this._showHidden,
        logType: type
      }, ...args)
    ]).map((arg) => isString(arg) && this._formatting === false ? strip(arg) : arg));
  }
  log(...args) {
    return this._msg("log", white, ...args);
  }
  info(...args) {
    return this._msg("info", cyan, ...args);
  }
  warn(...args) {
    return this._msg("warn", yellow, ...args);
  }
  error(...args) {
    return this._msg("error", red, ...args);
  }
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

export {
  random,
  bold,
  html,
  italic,
  strip,
  underline,
  Logger,
  Emitter
};
