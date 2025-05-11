import { Log, random, rgb, isWhat, wait, isDevEnv, calculate, parseArgs } from '..'

/*
 * We Can import everything from the main package
 *   import { Log, random, isWhat } from './index.js'
 *
 * Or import from specific files
 *   import { Log } from './classes.js'
 *   import { random } from './colors.js'
 *   import { isWhat } from './misc.js'
 */

const untaggedlog = new Log()
const taggedLog = new Log('Example Log Tag One', { devOnly: false })
const uncenteredTaggedLog = new Log('Example Uncentered Tag', { center: false, devOnly: false })
const centeredPadOuterTaggedLog = new Log('Example Outer Padded Tag', { centerPadInner: false, devOnly: false })
const uncoloredUntaggedlog = new Log('', { formatting: false })
const uncoloredTaggedlog = new Log('Example Log Tag  Two Long Text', { devOnly: false , formatting: false })
// eslint-disable-next-line no-console
const lineBreak = () => console.log()

for (const log of Object.keys(untaggedlog)) {
  if (log.startsWith('_')) continue
  untaggedlog[log as keyof Log](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(uncoloredUntaggedlog)) {
  if (log.startsWith('_')) continue
  uncoloredUntaggedlog[log as keyof Log](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(taggedLog)) {
  if (log.startsWith('_')) continue
  taggedLog[log as keyof Log](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(uncoloredTaggedlog)) {
  if (log.startsWith('_')) continue
  uncoloredTaggedlog[log as keyof Log](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(centeredPadOuterTaggedLog)) {
  if (log.startsWith('_')) continue
  centeredPadOuterTaggedLog[log as keyof Log]({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date())
}
lineBreak()
for (const log of Object.keys(uncenteredTaggedLog)) {
  if (log.startsWith('_')) continue
  uncenteredTaggedLog[log as keyof Log]({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date())
}
lineBreak()
untaggedlog.log('1s')
await wait({ seconds: 1 })
untaggedlog.log('2s')
await wait({ seconds: 1 })
untaggedlog.log('3s')
lineBreak()
untaggedlog.log('is Dev env:', isDevEnv())
lineBreak()
lineBreak()
untaggedlog.log('Calculate:', calculate('1000 * 60 * 60 * 1'))
untaggedlog.log('Calculate:', calculate('3600000'))
lineBreak()
lineBreak()
untaggedlog.log('Args:', parseArgs())
lineBreak()
lineBreak()
untaggedlog.log('RGB Color:', rgb({ r: 255, g: 105, b: 180 }, 'this should be pink!'))
untaggedlog.log('RGB Color:', rgb([ 0, 175, 255 ], 'this should be blue!'))
