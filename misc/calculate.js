// https://stackoverflow.com/a/75355272/4958977

const minus0Hack = value => (Object.is(value, -0) ? '-0' : value)

const operators = {
  '+': {
    func: (x, y) => `${minus0Hack(Number(x) + Number(y))}`,
    precedence: 1,
    associativity: 'left',
    arity: 2
  },
  '-': {
    func: (x, y) => `${minus0Hack(Number(x) - Number(y))}`,
    precedence: 1,
    associativity: 'left',
    arity: 2
  },
  '*': {
    func: (x, y) => `${minus0Hack(Number(x) * Number(y))}`,
    precedence: 2,
    associativity: 'left',
    arity: 2
  },
  '/': {
    func: (x, y) => `${minus0Hack(Number(x) / Number(y))}`,
    precedence: 2,
    associativity: 'left',
    arity: 2
  },
  '%': {
    func: (x, y) => `${minus0Hack(Number(x) % Number(y))}`,
    precedence: 2,
    associativity: 'left',
    arity: 2
  },
  '^': {
    func: (x, y) => `${minus0Hack(Number(x) ** Number(y))}`,
    precedence: 3,
    associativity: 'right',
    arity: 2
  }
}

const operatorsKeys = Object.keys(operators)

const functions = {
  min: { func: (x, y) => `${minus0Hack(Math.min(Number(x), Number(y)))}`, arity: 2 },
  max: { func: (x, y) => `${minus0Hack(Math.max(Number(x), Number(y)))}`, arity: 2 },
  sin: { func: x => `${minus0Hack(Math.sin(Number(x)))}`, arity: 1 },
  cos: { func: x => `${minus0Hack(Math.cos(Number(x)))}`, arity: 1 },
  tan: { func: x => `${minus0Hack(Math.tan(Number(x)))}`, arity: 1 },
  log: { func: x => `${Math.log(Number(x))}`, arity: 1 } // No need for -0 hack
}
const functionsKeys = Object.keys(functions)

const top = stack => stack[stack.length - 1]

function shuntingYard (tokens) {
  const output = []
  const operatorStack = []

  for (const token of tokens) {
    if (functions[token] !== undefined) {
      operatorStack.push(token)
    } else if (token === ',') {
      while (operatorStack.length > 0 && top(operatorStack) !== '(') {
        output.push(operatorStack.pop())
      }
      if (operatorStack.length === 0) {
        throw new Error('Misplaced \',\'')
      }
    } else if (operators[token] !== undefined) {
      const o1 = token
      while (
        operatorStack.length > 0 &&
        top(operatorStack) !== undefined &&
        top(operatorStack) !== '(' &&
        (operators[top(operatorStack)].precedence > operators[o1].precedence ||
          (operators[o1].precedence === operators[top(operatorStack)].precedence &&
            operators[o1].associativity === 'left'))
      ) {
        output.push(operatorStack.pop()) // o2
      }
      operatorStack.push(o1)
    } else if (token === '(') {
      operatorStack.push(token)
    } else if (token === ')') {
      while (operatorStack.length > 0 && top(operatorStack) !== '(') {
        output.push(operatorStack.pop())
      }
      if (operatorStack.length > 0 && top(operatorStack) === '(') {
        operatorStack.pop()
      } else {
        throw new Error('Parentheses mismatch')
      }
      if (functions[top(operatorStack)] !== undefined) {
        output.push(operatorStack.pop())
      }
    } else {
      output.push(token)
    }
  }

  while (operatorStack.length > 0) {
    const operator = top(operatorStack)
    if (operator === '(') {
      throw new Error('Parentheses mismatch')
    } else {
      output.push(operatorStack.pop())
    }
  }

  return output
}

function evalReversePolishNotation (tokens) {
  const stack = []
  const ops = { ...operators, ...functions }

  for (const token of tokens) {
    const op = ops[token]

    if (op !== undefined) {
      const parameters = []
      for (let i = 0; i < op.arity; i++) {
        parameters.push(stack.pop())
      }
      stack.push(op.func(...parameters.reverse()))
    } else {
      stack.push(token)
    }
  }

  if (stack.length > 1) {
    throw new Error('Insufficient operators')
  }

  return Number(stack[0])
}


// eslint-disable-next-line complexity
function tokenize (expression) {
  const expr = expression.replace(/\s+/g, ' ')
  const tokens = []

  let acc = ''
  let currentNumber = ''

  for (let i = 0; i < expr.length; i++) {
    const c = expr.charAt(i)
    const prevC = expr.charAt(i - 1) // '' if index out of range
    const nextC = expr.charAt(i + 1) // '' if index out of range

    const lastToken = top(tokens)

    const numberParsingStarted = currentNumber !== ''

    if (
      // 1
      (/\d/).test(c) ||
      // Unary operator: +1 or -1
      ((c === '+' || c === '-') &&
        !numberParsingStarted &&
        (lastToken === undefined ||
          lastToken === ',' ||
          lastToken === '(' ||
          operatorsKeys.includes(lastToken)) &&
        (/\d/).test(nextC))
    ) {
      currentNumber += c
    } else if (c === '.') {
      if (numberParsingStarted && currentNumber.includes('.')) {
        throw new Error(`Double '.' in number: '${currentNumber}${c}'`)
      } else {
        currentNumber += c
      }
    } else if (c === ' ') {
      if ((/\d/).test(prevC) && (/\d/).test(nextC)) {
        throw new Error(`Space in number: '${currentNumber}${c}${nextC}'`)
      }
    } else if (functionsKeys.includes(acc + c)) {
      acc += c
      if (!functionsKeys.includes(acc + nextC)) {
        tokens.push(acc)
        acc = ''
      }
    } else if (operatorsKeys.includes(c) || c === '(' || c === ')' || c === ',') {
      if (
        operatorsKeys.includes(c) &&
        !numberParsingStarted &&
        operatorsKeys.includes(lastToken)
      ) {
        throw new Error(`Consecutive operators: '${lastToken}${c}'`)
      }
      if (numberParsingStarted) {
        tokens.push(currentNumber)
      }
      tokens.push(c)
      currentNumber = ''
    } else {
      acc += c
    }
  }

  if (acc !== '') {
    throw new Error(`Invalid characters: '${acc}'`)
  }

  // Add last number to the tokens
  if (currentNumber !== '') {
    tokens.push(currentNumber)
  }

  if (tokens[0] === '+' || tokens[0] === '-') {
    tokens.unshift('0')
  }

  return tokens
}

export function calculate (expression) {
  const tokens = tokenize(expression)
  const rpn = shuntingYard(tokens)

  return evalReversePolishNotation(rpn)
}
