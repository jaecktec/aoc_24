import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {sum} from "../util/array-utils.js";
import {cacheResponse} from "../util/caching.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function solvePart1(input: string, numBlinks: number = 1): number {
    console.time('solvePart1');
    const stones = input.split(' ').map(Number);


    function transform(n: number) {
        if (n === 0) {
            return [1];
        }
        if (`${n}`.length % 2 === 0) {
            const left = `${n}`.substring(0, `${n}`.length / 2);
            const right = `${n}`.substring(`${n}`.length / 2);
            return [left, right].map(Number)
        }
        return [n * 2024];
    }

    function blink(inputStones: number[]) {
        const newStones: number[] = [];
        for (const stone of inputStones) {
            newStones.push(...transform(stone));
        }
        return newStones
    }

    const cache = new Map<string, number>();

    const calculate = cacheResponse(cache, (stones: number[], iterations: number): number => {
        // console.log(`iteration ${iterations} and having ${stones.length} in chunk`)
        const newStones = blink(stones);
        if (iterations === 1) {
            return newStones.length;
        }
        return sum(newStones.map(stone => calculate([stone], iterations - 1)))
    });

    let result = calculate(stones, numBlinks);
    console.timeEnd('solvePart1');
    return result;
}

console.table({
    'sample': solvePart1(sample, 25),
    'part1:': solvePart1(input, 25),
    'part2:': solvePart1(input, 75),
})
