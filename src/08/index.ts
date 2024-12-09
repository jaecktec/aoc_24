import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {countOccurrences, getAllCombinations} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function solvePart1(input: string): number {
    const map: ReadonlyArray<ReadonlyArray<string>> = input.split('\n').map(line => [...line]);
    // flatten the map
    const pairs: Map<string, string> = new Map(); // i-j -> frequency
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '.') continue;
            pairs.set(`${i}-${j}`, map[i][j]);
        }
    }
    // for all permutations of frequencies
    // group pairs by value
    const groupedPairs = pairs.entries().reduce((acc, [key, value]) => {
        acc.set(value, [...acc.get(value) || [], key.split('-').map(Number) as [number, number]]);
        return acc;
    }, new Map<string, Array<[number, number]>>());

    const mutableMap = map.slice().map(row => row.slice());

    let result: Set<string> = new Set<string>();
    for (const [_, coordinates] of groupedPairs) {
        // get all combinations of coordinates
        const combinations = getAllCombinations(coordinates, 2);
        for (const combination of combinations) {
            const distance = [combination[1][0] - combination[0][0], combination[1][1] - combination[0][1]];
            // find places to check
            const placesToCheck = combination
                .flatMap(([i, j]) => [
                    [i + distance[0], j + distance[1]],
                    [i - distance[0], j - distance[1]],
                ] as [number, number][])
                // filter places that are the original combination
                .filter(place => !combination.map(it => `${it[0]}-${it[1]}`).includes(`${place[0]}-${place[1]}`))
                // filter duplicates
                .filter((place, index, self) => self.map(it => `${it[0]}-${it[1]}`).indexOf(`${place[0]}-${place[1]}`) === index)
                // filter out of bounds
                .filter(([i, j]) => i >= 0 && i < mutableMap.length && j >= 0 && j < mutableMap[i].length)
            ;
            for (const [i, j] of placesToCheck) {
                mutableMap[i][j] = '#';
                result.add(`${i}-${j}`);
            }
        }
    }

    // console.log(mutableMap.map(row => row.join('')).join('\n'));

    return result.size;
}

function solvePart2(input: string): number {
    const map: ReadonlyArray<ReadonlyArray<string>> = input.split('\n').map(line => [...line]);
    // flatten the map
    const pairs: Map<string, string> = new Map(); // i-j -> frequency
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '.') continue;
            pairs.set(`${i}-${j}`, map[i][j]);
        }
    }
    // for all permutations of frequencies
    // group pairs by value
    const groupedPairs = pairs.entries().reduce((acc, [key, value]) => {
        acc.set(value, [...acc.get(value) || [], key.split('-').map(Number) as [number, number]]);
        return acc;
    }, new Map<string, Array<[number, number]>>());

    const mutableMap = map.slice().map(row => row.slice());

    let result: Set<string> = new Set<string>();
    for (const [frequency, coordinates] of groupedPairs) {
        // get all combinations of coordinates
        const combinations = getAllCombinations(coordinates, 2);
        for (const combination of combinations) {
            const distance = [combination[1][0] - combination[0][0], combination[1][1] - combination[0][1]];
            // find places to check
            const placesToCheck = combination
                .flatMap(([i, j]) => [
                    ...[...new Array(100)].map((_, p) => p).map(p => [i + distance[0] * p, j + distance[1] * p]),
                    ...[...new Array(100)].map((_, p) => p).map(p => [i - distance[0] * p, j - distance[1] * p]),
                ] as [number, number][])
                // filter places that are the original combination
                .filter(place => !combination.map(it => `${it[0]}-${it[1]}`).includes(`${place[0]}-${place[1]}`))
                // filter duplicates
                .filter((place, index, self) => self.map(it => `${it[0]}-${it[1]}`).indexOf(`${place[0]}-${place[1]}`) === index)
                // filter out of boundsN
                .filter(([i, j]) => i >= 0 && i < mutableMap.length && j >= 0 && j < mutableMap[i].length)
            ;
            for (const [i, j] of placesToCheck) {
                if (!['.', frequency].includes(mutableMap[i][j])) continue;
                result.add(`${i}-${j}`);
                if (mutableMap[i][j] === '.') mutableMap[i][j] = '#';
            }
        }
    }

    // console.log(mutableMap.map(row => row.join('')).join('\n'));

    return mutableMap.length * mutableMap[0].length - countOccurrences(mutableMap.flat(), '.')
    // return result.size;
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
