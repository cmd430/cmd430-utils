import { Log, random, rgb, isWhat, wait, isDevEnv, calculate, parseArgs, red } from '../src'

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
const uncoloredUntaggedlog = new Log('', { alignment: 'none', colors: false })
const taggedLog = new Log('Example Padded Aligned Tag', { alignment: 'ceter-padded' })
const uncoloredTaggedlog = new Log('Example Right Aligned Tag', { alignment: 'right', colors: false })
const centeredPadOuterTaggedLog = new Log('Example Center Aligned Tag', { alignment: 'center' })
const uncenteredTaggedLog = new Log('Example Left Aligned Tag', { alignment: 'left' })

// eslint-disable-next-line no-console
const lineBreak = () => console.log()

verylongtaglog.log('')
lineBreak()

for (const log of Object.keys(untaggedlog)) {
  if (log.startsWith('_') || log === 'notice') continue
  untaggedlog[log as 'log'](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(uncoloredUntaggedlog)) {
  if (log.startsWith('_') || log === 'notice') continue
  uncoloredUntaggedlog[log as 'log'](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(taggedLog)) {
  if (log.startsWith('_') || log === 'notice') continue
  taggedLog[log as 'log'](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(uncoloredTaggedlog)) {
  if (log.startsWith('_') || log === 'notice') continue
  uncoloredTaggedlog[log as 'log'](random({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date()))
}
lineBreak()
for (const log of Object.keys(centeredPadOuterTaggedLog)) {
  if (log.startsWith('_') || log === 'notice') continue
  centeredPadOuterTaggedLog[log as 'log']({
    this: 'is',
    an: isWhat({})
  }, 'this a date', new Date())
}
lineBreak()
for (const log of Object.keys(uncenteredTaggedLog)) {
  if (log.startsWith('_') || log === 'notice') continue
  uncenteredTaggedLog[log as 'log']({
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
lineBreak()

untaggedlog.notice(`${red('‼')} THIS IS A SINGLE STYLED NOTICE ${red('‼')}`, {
  style: 'single'
})
untaggedlog.notice(`${red('‼')} THIS IS A ROUNDED STYLED NOTICE ${red('‼')}`, {
  style: 'rounded'
})
untaggedlog.notice(`${red('‼')} THIS IS A DOUBLE STYLED NOTICE ${red('‼')}`, {
  style: 'double'
})

untaggedlog.notice(`${red('‼')} THIS IS A CUSTOM COLOR NOTICE ${red('‼')}`, {
  colorFn: (...args) => rgb({ r: 219, g: 104, b: 40 }, ...args)
})

untaggedlog.notice(`${red('‼')} THIS IS A LOG NOTICE ${red('‼')}`, {
  type: 'log'
})
untaggedlog.notice(`${red('‼')} THIS IS AN INFO NOTICE ${red('‼')}`, {
  type: 'info'
})
untaggedlog.notice(`${red('‼')} THIS IS A WARN NOTICE ${red('‼')}`, {
  type: 'warn'
})
untaggedlog.notice(`${red('‼')} THIS IS AN ERROR NOTICE ${red('‼')}`, {
  type: 'error'
})
untaggedlog.notice(`${red('‼')} THIS IS A DEBUG NOTICE ${red('‼')}`, {
  type: 'debug'
})
lineBreak()
untaggedlog.error(new Error('test'))
