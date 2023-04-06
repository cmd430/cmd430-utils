import { Log, random, isWhat, __dirname, __filename, wait, isDevEnv } from './index.js'

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
const taggedLog = new Log({ tag: { text: 'Example Log Tag One', devOnly: false } })
const uncenteredTaggedLog = new Log({ tag: { text: 'Example Uncentered Tag', center: false, devOnly: false } })
const centeredPadOuterTaggedLog = new Log('Example Outer Padded Tag', { centerPadInner: false, devOnly: false })
const uncoloredUntaggedlog = new Log({ formatting: false })
const uncoloredTaggedlog = new Log({ tag: { text: 'Example Log Tag  Two Long Text', devOnly: false }, formatting: false })
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
for (const log of Object.keys(centeredPadOuterTaggedLog)) {
  centeredPadOuterTaggedLog[log]({
    'this': 'is',
    'an': isWhat({})
  }, 'this a date', new Date())
}
lineBreak()
for (const log of Object.keys(uncenteredTaggedLog)) {
  uncenteredTaggedLog[log]({
    'this': 'is',
    'an': isWhat({})
  }, 'this a date', new Date())
}
lineBreak()
untaggedlog.log('current file path', __filename())
untaggedlog.debug('current file directory path',__dirname())
lineBreak()
untaggedlog.log('1s')
await wait({ seconds: 1 })
untaggedlog.log('2s')
await wait({ seconds: 1 })
untaggedlog.log('3s')
lineBreak()
untaggedlog.log('is Dev env:', isDevEnv())
