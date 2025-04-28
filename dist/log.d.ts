export { L as Log } from './Logger-hEnMlb33.js';

declare const cyan: ColorFN;

declare const green: ColorFN;

declare const grey: ColorFN;

declare const magenta: ColorFN;

declare const red: ColorFN;

declare const white: ColorFN;

declare const yellow: ColorFN;

declare const random: ColorFN;

type ColorFN = (...args: any[]) => string;

declare const bold: FormattingFN;

declare const html: FormatFN;

declare const italic: FormattingFN;

declare const strip: FormatFN;

declare const underline: FormattingFN;

type FormattingFN = (...args: any[]) => string;
type FormatFN = (arg: string) => string;

export { type ColorFN, type FormatFN, type FormattingFN, bold, cyan, green, grey, html, italic, magenta, random, red, strip, underline, white, yellow };
