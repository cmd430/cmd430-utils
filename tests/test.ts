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

const verylongtaglog = new Log('Very long tag to show the alignments')
const untaggedlog = new Log()
const taggedLog = new Log('Example Padded Aligned Tag', { alignment: 'ceter-padded' })
const uncenteredTaggedLog = new Log('Example Left Aligned Tag', { alignment: 'left' })
const centeredPadOuterTaggedLog = new Log('Example Center Aligned Tag', { alignment: 'center' })
const uncoloredUntaggedlog = new Log('', { alignment: 'none', colors: false })
const uncoloredTaggedlog = new Log('Example Right Aligned Tag', { alignment: 'right', colors: false })
// eslint-disable-next-line no-console
const lineBreak = () => console.log()

verylongtaglog.log('')
lineBreak()

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
