type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;
type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

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

export type { ColorHexString as C, RGBArgs as R, ColorRGB as a };
