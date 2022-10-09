import { Log } from './log.js'
import { random } from './colors.js'
import { isWhat } from './misc.js'

//import { Log, colors, misc } from './index.js' // Can also import from the main package

//const { random } = colors
//const { isWhat } = misc

const untaggedlog = new Log()
const taggedLog = new Log({ tag: { text: 'Tag One', devOnly: false } })
const uncoloredUntaggedlog = new Log({ formatting: false })
const uncoloredTaggedlog = new Log({ tag: { text: 'Tag Two', devOnly: false }, formatting: false })
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
