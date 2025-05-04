import {
  isArray,
  isDate,
  isError,
  isObject,
  isString,
  isUndefined
} from "./chunk-XTUR6TW3.js";

// src/Log/Private/parse.ts
import { inspect } from "node:util";
var parse = (opts, ...args) => args.map((arg) => {
  const { colors, showHidden, logType } = opts;
  const shouldInspect = isObject(arg) || isArray(arg) || isDate(arg) || isUndefined(arg);
  if ((shouldInspect || showHidden) && !isString(arg)) return inspect(arg, {
    showHidden,
    depth: null,
    colors
  });
  return isError(arg) && logType === "error" ? arg.stack : arg;
}).join(" ");

// src/Log/Private/timestamp.ts
var { locale } = (() => Intl.DateTimeFormat().resolvedOptions())();
var timestamp = () => (/* @__PURE__ */ new Date()).toLocaleString(locale, {
  formatMatcher: "best fit",
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

// src/Log/Private/supports.ts
import { env, platform, stdout } from "node:process";
function formatting() {
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM ?? "")) return true;
  if ("COLORTERM" in env) return true;
  if (platform === "win32") return true;
  if (stdout.hasColors()) return true;
  return false;
}

// src/Log/Colors/cyan.ts
var cyan = (...args) => `\x1B[96m${parse({ colors: false }, ...args)}\x1B[0m`;

// src/Log/Colors/green.ts
var green = (...args) => `\x1B[92m${parse({ colors: false }, ...args)}\x1B[0m`;

// src/Log/Colors/grey.ts
var grey = (...args) => `\x1B[90m${parse({ colors: false }, ...args)}\x1B[0m`;

// src/Log/Colors/magenta.ts
var magenta = (...args) => `\x1B[95m${parse({ colors: false }, ...args)}\x1B[0m`;

// src/Log/Colors/red.ts
var red = (...args) => `\x1B[91m${parse({ colors: false }, ...args)}\x1B[0m`;

// src/Log/Colors/white.ts
var white = (...args) => `\x1B[97m${parse({ colors: false }, ...args)}\x1B[0m`;

// src/Log/Colors/yellow.ts
var yellow = (...args) => `\x1B[93m${parse({ colors: false }, ...args)}\x1B[0m`;

export {
  parse,
  timestamp,
  formatting,
  cyan,
  green,
  grey,
  magenta,
  red,
  white,
  yellow
};
