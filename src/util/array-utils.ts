export function sum(array: ReadonlyArray<number>): number {
    return array.reduce((r, l) => r + l, 0);
}
export function product(array: ReadonlyArray<number>): number {
    return array.reduce((r, l) => r * l, 1);
}