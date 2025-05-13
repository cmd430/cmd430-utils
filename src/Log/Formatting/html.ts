import type { FormatFN } from '.'

/**
 * Replace text console escape codes with HTML
 *
 * > **Notice:** _does not work with rgb colored text at this time_!
 *
 * @example
 * html(red('this is red text as html'))
 */
export const html: FormatFN = arg => {
  // eslint-disable-next-line no-control-regex
  for (const { groups } of arg.matchAll(/(?<full>\x1b[[(?);]{0,2}(?<code>;?\d*).)/g)) {
    const { full, code } = groups as { full: string, code: string }

    switch (code) {
      case '1': { // bold
        arg = arg.replaceAll(full, '<b>')
        break
      }
      case '22': { // end bold
        arg = arg.replaceAll(full, '</b>')
        break
      }
      case '3': { // italic
        arg = arg.replaceAll(full, '<i>')
        break
      }
      case '23': { // end italic
        arg = arg.replaceAll(full, '</i>')
        break
      }
      case '4': { // underline
        arg = arg.replaceAll(full, '<u>')
        break
      }
      case '24': { // end underline
        arg = arg.replaceAll(full, '</u>')
        break
      }
      case '9': { // strikethrough
        arg = arg.replaceAll(full, '<s>')
        break
      }
      case '29': { // end strikethrough
        arg = arg.replaceAll(full, '</s>')
        break
      }
      case '32': { // Green
        arg = arg.replaceAll(full, '<span style="color: rgb(139, 180, 62)">')
        break
      }
      case '33': { // Yellow
        arg = arg.replaceAll(full, '<span style="color: rgb(179, 182, 63)">')
        break
      }
      case '35': { // Purple
        arg = arg.replaceAll(full, '<span style="color: rgb(150, 121, 202)">')
        break
      }
      case '90': { // Bright Grey
        arg = arg.replaceAll(full, '<span style="color: rgb(145, 145, 145)">')
        break
      }
      case '91': { // Bright Red
        arg = arg.replaceAll(full, '<span style="color: rgb(205, 64, 38)">')
        break
      }
      case '92': { // Bright Green
        arg = arg.replaceAll(full, '<span style="color: rgb(131, 212, 70)">')
        break
      }
      case '93': { // Bright Yellow
        arg = arg.replaceAll(full, '<span style="color: rgb(223, 199, 63)">')
        break
      }
      case '95': { // Bright Purple
        arg = arg.replaceAll(full, '<span style="color: rgb(171, 127, 250)">')
        break
      }
      case '96': { // Bright Cyan
        arg = arg.replaceAll(full, '<span style="color: rgb(121, 212, 237)">')
        break
      }
      case '97': { // Bright White
        arg = arg.replaceAll(full, '<span style="color: rgb(255, 255, 255)">')
        break
      }
      case '39': // default
      case '0': { // reset
        arg = arg.replaceAll(full, '</span>')
        break
      }
      default: { // strip unknown
        arg = arg.replaceAll(full, '')
      }
    }
  }

  return arg
}
