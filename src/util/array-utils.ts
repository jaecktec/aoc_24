export function sum(array: ReadonlyArray<number>): number {
    return array.reduce((r, l) => r + l, 0);
}