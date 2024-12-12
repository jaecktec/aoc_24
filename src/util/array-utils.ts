export function sum(array: ReadonlyArray<number>): number {
    return array.reduce((r, l) => r + l, 0);
}

export function product(array: ReadonlyArray<number>): number {
    return array.reduce((r, l) => r * l, 1);
}

export function rotateMatrix<T>(matrix: T[][]): T[][] {
    const n = matrix.length;
    const rotated = Array.from({length: n}, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            rotated[j][n - 1 - i] = matrix[i][j];
        }
    }

    return rotated;
}

export function rotateMatrix45<T>(matrix: T[][]): T[][] {
    const n = matrix.length;
    const m = matrix[0].length;
    const newSize = n + m - 1;
    const rotated = Array.from({length: newSize}, () => Array(newSize).fill(' '));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            rotated[i + j][(n - 1 - i) + j] = matrix[i][j];
        }
    }

    return rotated;
}

export function rotateMatrixMinus45<T>(matrix: T[][]): T[][] {
    const n = matrix.length;
    const m = matrix[0].length;
    const newSize = n + m - 1;
    const rotated = Array.from({length: newSize}, () => Array(newSize).fill(' '));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            rotated[(n - 1 - i) + j][i + j] = matrix[i][j];
        }
    }

    return rotated;
}

export function matchesPattern<T>(matrix: T[][], pattern: (T | undefined)[][], j: number, i: number): boolean {
    const matrixWindow = matrix.slice(i, i + pattern.length).map(r => r.slice(j, j + pattern[0].length));
    // if dimensions are not equal, return false
    if(matrixWindow.length !== pattern.length || matrixWindow[0].length !== pattern[0].length) return false;

    for (let patternI = 0; patternI < pattern.length; patternI++) {
        for (let patternJ = 0; patternJ < pattern[0].length; patternJ++) {
            if (pattern[patternI][patternJ] === undefined) continue;
            if (matrixWindow[patternI][patternJ] !== pattern[patternI][patternJ]) {

                return false;
            }
        }
    }
    return true;
}

export function reverseArray<T>(a: T[]): T[] {
    const array = a.slice();
    const reversed = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i]);
    }
    return reversed;
}

/**
 * Returns all combinations of length `combinationLength` from the list
 * @param list
 * @param combinationLength
 */
export function getAllCombinations<T>(list: T[], combinationLength: number): T[][] {
    if (combinationLength === 1) {
        return list.map(item => [item]);
    }

    const combinations: T[][] = [];
    for (let i = 0; i <= list.length - combinationLength; i++) {
        const head = list.slice(i, i + 1);
        const tailCombinations = getAllCombinations(list.slice(i + 1), combinationLength - 1);
        for (const tailCombination of tailCombinations) {
            combinations.push(head.concat(tailCombination));
        }
    }

    return combinations;
}

export function countOccurrences<T>(array: T[], thing: T): number {
    let counts = 0;
    for (const item of array) {
        if (item === thing) {
            counts++;
        }
    }
    return counts;
}

export function insertElementAt<T>(array: T[], element: T, position: number): T[] {
    array.splice(position, 0, element);
    return array;
}

export function removeElementAt<T>(array: T[], position: number): T[] {
    array.splice(position, 1);
    return array;
}