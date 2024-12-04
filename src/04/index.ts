import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {matchesPattern, rotateMatrix, rotateMatrix45, rotateMatrixMinus45} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function countXmasInLines(lines: string[]) {
    let result = 0;
    for (const line of lines) {
        let resultInLine = 0;
        for (let i = 0; i < line.length; i++) {
            let substr = line.substring(i);
            if (substr.startsWith('XMAS') || substr.startsWith('SAMX')) {
                result++;
                resultInLine++
            }
        }
    }
    return result;
}

function solvePart1(input: string): number {
    let result = 0;
    const matrix = input.split('\n').map(r => [...r]);

    result += countXmasInLines(matrix.map(r => r.join('')));
    result += countXmasInLines(rotateMatrix(matrix).map(r => r.join('')));
    result += countXmasInLines(rotateMatrix45(matrix).map(r => r.filter(it => it !== ' ').join('')));
    result += countXmasInLines(rotateMatrixMinus45(matrix).map(r => r.filter(it => it !== ' ').join('')));

    return result;
}

function solvePart2(input: string): number {
    const matrix = input.split('\n').map(r => [...r]);

    const searchPattern = [
        ['M', undefined, 'S'],
        [undefined, 'A', undefined],
        ['M', undefined, 'S'],
    ]
    const searchPatterns = [
        searchPattern,
        rotateMatrix(searchPattern),
        rotateMatrix(rotateMatrix(searchPattern)),
        rotateMatrix(rotateMatrix(rotateMatrix(searchPattern))),
    ]
    let result = 0;
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
            for (const searchPattern1 of searchPatterns) {
                if (matchesPattern(matrix, searchPattern1, j, i)) {
                    result++;
                }
            }
        }
    }

    return result
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
