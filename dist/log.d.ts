export { C as ConsoleLogger, L as Log } from './ConsoleLogger-xB8eZPO5.js';
import { R as RGBArgs } from './Colors-DnV0vRpA.js';

/**
 * Color text cyan
 * @example
 * cyan('this should be cyan!')
 */
declare const cyan: ColorFN;

/**
 * Color text green
 * @example
 * green('this should be green!')
 */
declare const green: ColorFN;

/**
 * Color text grey
 * @example
 * grey('this should be grey!')
 */
declare const grey: ColorFN;

/**
 * Color text magenta
 * @example
 * magenta('this should be magenta!')
 */
declare const magenta: ColorFN;

/**
 * Color text red
 * @example
 * red('this should be red!')
 */
declare const red: ColorFN;

/**
 * Color text white
 * @example
 * white('this should be white!')
 */
declare const white: ColorFN;

/**
 * Color text yellow
 * @example
 * yellow('this should be yellow!')
 */
declare const yellow: ColorFN;

/**
 * Color text a random color (cyan, green, grey, magenta, red, white, yellow)
 * @example
 * random('this should be colored!')
 */
declare const random: ColorFN;

/**
 * Color Text with RGB value
 * @example
 * rgb({ r: 255, g: 105, b: 180 }, 'this should be pink!')
 * rgb([ 0, 175, 255 ], 'this should be blue!')
 */
declare const rgb: RGBColorFN;

type ColorFN = (...args: any[]) => string;
type RGBColorFN = (color: RGBArgs, ...args: any[]) => string;

/**
 * Format text in bold
 * @example
 * bold('this should be bold!')
 */
declare const bold: FormattingFN;

/**
 * Replace text console escape codes with HTML
 *
 * > **Notice:** _does not work with rgb colored text at this time_!
 *
 * @example
 * html(red('this is red text as html'))
 */
declare const html: FormatFN;

/**
 * Format text in italics
 * @example
 * italic('this should be italic!')
 */
declare const italic: FormattingFN;

/**
 * Format text in italics
 * @example
 * italic('this should be italic!')
 */
declare const strikethrough: FormattingFN;

/**
 * Strip text of console escape formatting and color codes
 * @example
 * strip('this should be plain text!')
 */
declare const strip: FormatFN;

/**
 * Format text with underline
 * @example
 * underline('this should be underlined!')
 */
declare const underline: FormattingFN;

type FormattingFN = (...args: any[]) => string;
type FormatFN = (arg: string) => string;

export { type ColorFN, type FormatFN, type FormattingFN, type RGBColorFN, bold, cyan, green, grey, html, italic, magenta, random, red, rgb, strikethrough, strip, underline, white, yellow };
