// src/Utils/calculate.ts
var minus0Hack = (value) => Object.is(value, -0) ? "-0" : value;
var operators = {
  "+": {
    func: (x, y) => `${minus0Hack(Number(x) + Number(y))}`,
    precedence: 1,
    associativity: "left",
    arity: 2
  },
  "-": {
    func: (x, y) => `${minus0Hack(Number(x) - Number(y))}`,
    precedence: 1,
    associativity: "left",
    arity: 2
  },
  "*": {
    func: (x, y) => `${minus0Hack(Number(x) * Number(y))}`,
    precedence: 2,
    associativity: "left",
    arity: 2
  },
  "/": {
    func: (x, y) => `${minus0Hack(Number(x) / Number(y))}`,
    precedence: 2,
    associativity: "left",
    arity: 2
  },
  "%": {
    func: (x, y) => `${minus0Hack(Number(x) % Number(y))}`,
    precedence: 2,
    associativity: "left",
    arity: 2
  },
  "^": {
    /*
     * Why Math.pow() instead of **?
     * -2 ** 2 => "SyntaxError: Unary operator used immediately before exponentiation expression..."
     * Math.pow(-2, 2) => -4
     */
    func: (x, y) => `${minus0Hack(Math.pow(Number(x), Number(y)))}`,
    precedence: 3,
    associativity: "right",
    arity: 2
  }
};
var operatorsKeys = Object.keys(operators);
var functions = {
  min: { func: (x, y) => `${minus0Hack(Math.min(Number(x), Number(y)))}`, arity: 2 },
  max: { func: (x, y) => `${minus0Hack(Math.max(Number(x), Number(y)))}`, arity: 2 },
  sin: { func: (x) => `${minus0Hack(Math.sin(Number(x)))}`, arity: 1 },
  cos: { func: (x) => `${minus0Hack(Math.cos(Number(x)))}`, arity: 1 },
  tan: { func: (x) => `${minus0Hack(Math.tan(Number(x)))}`, arity: 1 },
  log: { func: (x) => `${Math.log(Number(x))}`, arity: 1 }
  // No need for -0 hack
};
var functionsKeys = Object.keys(functions);
function shuntingYard(tokens) {
  const output = new Array();
  const operatorStack = new Array();
  for (const token of tokens) {
    if (functions[token] !== void 0) {
      operatorStack.push(token);
    } else if (token === ",") {
      while (operatorStack.length > 0 && operatorStack.at(-1) !== "(") {
        output.push(operatorStack.pop());
      }
      if (operatorStack.length === 0) {
        throw new Error("Misplaced ','");
      }
    } else if (operators[token] !== void 0) {
      const o1 = token;
      while (operatorStack.length > 0 && operatorStack.at(-1) !== void 0 && operatorStack.at(-1) !== "(" && (operators[operatorStack.at(-1)].precedence > operators[o1].precedence || operators[o1].precedence === operators[operatorStack.at(-1)].precedence && operators[o1].associativity === "left")) {
        output.push(operatorStack.pop());
      }
      operatorStack.push(o1);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack.length > 0 && operatorStack.at(-1) !== "(") {
        output.push(operatorStack.pop());
      }
      if (operatorStack.length > 0 && operatorStack.at(-1) === "(") {
        operatorStack.pop();
      } else {
        throw new Error("Parentheses mismatch");
      }
      if (functions[operatorStack.at(-1)] !== void 0) {
        output.push(operatorStack.pop());
      }
    } else {
      output.push(token);
    }
  }
  while (operatorStack.length > 0) {
    const operator = operatorStack.at(-1);
    if (operator === "(") {
      throw new Error("Parentheses mismatch");
    } else {
      output.push(operatorStack.pop());
    }
  }
  return output;
}
function evalReversePolishNotation(tokens) {
  const stack = new Array();
  const ops = { ...operators, ...functions };
  for (const token of tokens) {
    const op = ops[token];
    if (op !== void 0) {
      const parameters = [];
      for (let i = 0; i < op.arity; i++) {
        parameters.push(stack.pop());
      }
      stack.push(op.func(...parameters.reverse()));
    } else {
      stack.push(token);
    }
  }
  if (stack.length > 1) {
    throw new Error("Insufficient operators");
  }
  return Number(stack[0]);
}
function tokenize(expression) {
  const expr = expression.replace(/\s+/g, " ");
  const tokens = [];
  let acc = "";
  let currentNumber = "";
  for (let i = 0; i < expr.length; i++) {
    const c = expr.charAt(i);
    const prevC = expr.charAt(i - 1);
    const nextC = expr.charAt(i + 1);
    const lastToken = tokens.at(-1);
    const numberParsingStarted = currentNumber !== "";
    if (
      // 1
      /\d/.test(c) || // Unary operator: +1 or -1
      (c === "+" || c === "-") && !numberParsingStarted && (lastToken === void 0 || lastToken === "," || lastToken === "(" || operatorsKeys.includes(lastToken)) && /\d/.test(nextC)
    ) {
      currentNumber += c;
    } else if (c === ".") {
      if (numberParsingStarted && currentNumber.includes(".")) {
        throw new Error(`Double '.' in number: '${currentNumber}${c}'`);
      } else {
        currentNumber += c;
      }
    } else if (c === " ") {
      if (/\d/.test(prevC) && /\d/.test(nextC)) {
        throw new Error(`Space in number: '${currentNumber}${c}${nextC}'`);
      }
    } else if (functionsKeys.includes(acc + c)) {
      acc += c;
      if (!functionsKeys.includes(acc + nextC)) {
        tokens.push(acc);
        acc = "";
      }
    } else if (operatorsKeys.includes(c) || c === "(" || c === ")" || c === ",") {
      if (operatorsKeys.includes(c) && !numberParsingStarted && operatorsKeys.includes(lastToken)) {
        throw new Error(`Consecutive operators: '${lastToken}${c}'`);
      }
      if (numberParsingStarted) {
        tokens.push(currentNumber);
      }
      tokens.push(c);
      currentNumber = "";
    } else {
      acc += c;
    }
  }
  if (acc !== "") {
    throw new Error(`Invalid characters: '${acc}'`);
  }
  if (currentNumber !== "") {
    tokens.push(currentNumber);
  }
  if (tokens[0] === "+" || tokens[0] === "-") {
    tokens.unshift("0");
  }
  return tokens;
}
function calculate(expression) {
  const tokens = tokenize(expression);
  const rpn = shuntingYard(tokens);
  return evalReversePolishNotation(rpn);
}

// src/Utils/fetchJSON.ts
async function fetchJSON(...[input, init]) {
  const res = await fetch(input, init);
  return res.json();
}

// src/Utils/fetchText.ts
async function fetchText(...[input, init]) {
  const res = await fetch(input, init);
  return res.text();
}

// src/Utils/isType.ts
function isType(type, object) {
  return Object.prototype.toString.call(object) === `[object ${type}]`;
}

// src/Utils/isArray.ts
function isArray(object) {
  return isType("Array", object);
}

// src/Utils/isAsyncFunction.ts
function isAsyncFunction(object) {
  return isType("AsyncFunction", object);
}

// src/Utils/isBoolean.ts
function isBoolean(object) {
  return isType("Boolean", object);
}

// src/Utils/isDate.ts
function isDate(object) {
  return isType("Date", object);
}

// src/Utils/isDevEnv.ts
import { env } from "node:process";
function isDevEnv() {
  return (env.NODE_ENV?.startsWith("prod") ?? false) === false;
}

// src/Utils/isEqual.ts
function isEqual(a, b) {
  if (a === b) {
    return true;
  }
  const bothAreObjects = a && b && typeof a === "object" && typeof b === "object";
  return Boolean(
    bothAreObjects && Object.keys(a).length === Object.keys(b).length && Object.entries(a).every(([k, v]) => isEqual(v, b[k]))
  );
}

// src/Utils/isError.ts
function isError(object) {
  return isType("Error", object);
}

// src/Utils/isFunction.ts
function isFunction(object) {
  return isType("Function", object);
}

// src/Utils/isNull.ts
function isNull(object) {
  return isType("Null", object);
}

// src/Utils/isNumber.ts
function isNumber(object) {
  return isType("Number", object);
}

// src/Utils/isObject.ts
function isObject(object) {
  return isType("Object", object);
}

// src/Utils/isRegExp.ts
function isRegExp(object) {
  return isType("RegExp", object);
}

// src/Utils/isString.ts
function isString(object) {
  return isType("String", object);
}

// src/Utils/isUndefined.ts
function isUndefined(object) {
  return isType("Undefined", object);
}

// src/Utils/isWhat.ts
function isWhat(object) {
  return Object.prototype.toString.call(object).match(/\[object (?<type>\w+)\]/).groups.type;
}

// src/Utils/omit.ts
function omit(obj, ...keys) {
  return keys.reduce((filtered, key) => {
    const { [key]: omitted, ...rest } = filtered;
    return rest;
  }, obj);
}

// src/Utils/padCenter.ts
function padCenter(str, maxLen) {
  return str.padStart((str.length + maxLen) / 2).padEnd(maxLen);
}

// src/Utils/parseArgs.ts
import { argv } from "node:process";
var parseArgBool = (argValue) => {
  const argValueLower = argValue?.toLowerCase();
  if (argValueLower === "false") return false;
  if (argValueLower === "true") return true;
  if (argValueLower != null) return argValue;
  return true;
};
function parseArgs() {
  return argv.slice(2).reduce((args, arg) => {
    const isLong = arg.slice(0, 2) === "--";
    const isArray2 = isLong && /^--\w+\[\]=/.test(arg);
    const isShort = !isLong && arg.slice(0, 1) === "-";
    if (isLong && isArray2 === false) {
      const [flag, value] = arg.slice(2).split("=");
      args[flag] ??= parseArgBool(value);
    }
    if (isShort) arg.slice(1).split("").forEach((flag) => args[flag] ??= true);
    if (isArray2) {
      const [flag, value] = arg.slice(2).split("[]=");
      args[flag] ??= [];
      args[flag].push(value);
    }
    return args;
  }, {});
}

// src/Utils/pick.ts
function pick(obj, ...keys) {
  return keys.reduce((acc, key) => {
    return acc = Object.assign(acc, { [key]: obj[key] });
  }, {});
}

// src/Utils/replaceTokens.ts
function replaceTokens(string, tokens) {
  for (const [token, value] of Object.entries(tokens)) {
    string = string.replaceAll(token, value);
  }
  return string;
}

// src/Utils/wait.ts
function wait(delay) {
  const { promise, resolve } = Promise.withResolvers();
  const { minutes = 0, seconds = 0, milliseconds = 0 } = delay;
  setTimeout(resolve, 1e3 * 60 * minutes + 1e3 * seconds + milliseconds);
  return promise;
}

export {
  calculate,
  fetchJSON,
  fetchText,
  isType,
  isArray,
  isAsyncFunction,
  isBoolean,
  isDate,
  isDevEnv,
  isEqual,
  isError,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isUndefined,
  isWhat,
  omit,
  padCenter,
  parseArgs,
  pick,
  replaceTokens,
  wait
};
//# sourceMappingURL=chunk-VIZA6XI7.mjs.map