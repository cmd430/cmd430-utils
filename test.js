import { Log, random, isWhat, __dirname, __filename } from './index.js'

/*
 * We Can import everything from the main package
 *   import { Log, random, isWhat } from './index.js'
 *
 * Or import from specific files
 *   import { Log } from './log.js'
 *   import { random } from './colors.js'
 *   import { isWhat } from './misc.js'
 */

const untaggedlog = new Log()
const taggedLog = new Log({ tag: { text: 'Tag One', devOnly: false } })
const uncoloredUntaggedlog = new Log({ formatting: false })
const uncoloredTaggedlog = new Log({ tag: { text: 'Tag Two', devOnly: false }, formatting: false })
// eslint-disable-next-line no-console
const lineBreak = () => console.log()

for (const log of Object.keys(untaggedlog)) {
  untaggedlog[log](random({
    'this': 'is',
    'an': isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(uncoloredUntaggedlog)) {
  uncoloredUntaggedlog[log](random({
    'this': 'is',
    'an': isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(taggedLog)) {
  taggedLog[log](random({
    'this': 'is',
    'an': isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(uncoloredTaggedlog)) {
  uncoloredTaggedlog[log](random({
    'this': 'is',
    'an': isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
/* eslint-disable no-console */
console.log(__filename())
console.debug(__dirname())
/* eslint-enable no-console */
lineBreak()
