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