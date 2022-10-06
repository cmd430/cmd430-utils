const { Log, colors: { random } } = require('./logging')
const { isWhat } = require('./misc')

const { log, info, warn, error, debug } = new Log() // Can optionally give the log a tag by passing a string to the constructor
const { log: taggedLog, info: taggedInfo, warn: taggedWarn, error: taggedError, debug: taggedDebug } = new Log('Tagged')

log(random({
  'this': 'is',
  'an': isWhat({})
}, 'this a date', new Date()))

info(random({
  'this': 'is',
  'an': isWhat([])
}, 'this a date', new Date()))

warn(random({
  'this': 'is',
  'an': isWhat(new Error())
}, 'this a date', new Date()))

error(random({
  'this': 'is',
  'an': isWhat(() => {})
}, 'this a date', new Date()))

debug(random({
  'this': 'is',
  'an': isWhat(null)
}, 'this a date', new Date()))

taggedLog({
  'this': 'is',
  'an': isWhat({})
}, 'this a date', new Date())

taggedInfo({
  'this': 'is',
  'an': isWhat([])
}, 'this a date', new Date())

taggedWarn({
  'this': 'is',
  'an': isWhat(new Error())
}, 'this a date', new Date())

taggedError({
  'this': 'is',
  'an': isWhat(() => {})
}, 'this a date', new Date())

taggedDebug({
  'this': 'is',
  'an': isWhat(null)
}, 'this a date', new Date())
