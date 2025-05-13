type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;
type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type ColorFN = (...args: any[]) => string;
type RGBColorFN = (color: RGBArgs, ...args: any[]) => string;
type ColorHexString = `#${string}${string}${string}${string}${string}${string}`;
interface ColorRGB {
    r: NumberRange<0, 256>;
    g: NumberRange<0, 256>;
    b: NumberRange<0, 256>;
}
type RGBArgs = {
    r: NumberRange<0, 256>;
    g: NumberRange<0, 256>;
    b: NumberRange<0, 256>;
} | [
    NumberRange<0, 256>,
    NumberRange<0, 256>,
    NumberRange<0, 256>
];

export type { ColorFN as C, RGBColorFN as R, ColorHexString as a, ColorRGB as b, RGBArgs as c };
