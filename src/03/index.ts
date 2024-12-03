import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {product, sum} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample1 = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
const sample2 = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))';
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function solvePart1(input: string): number {
    const mulPattern = /mul\((\d+,\d+)\)/gi;
    const matched = input.match(mulPattern) || [];
    const result = matched
        .filter(m => m.startsWith('mul('))
        .flatMap(m => m.match(/(\d+),(\d+)/g)!)
        .map(m => m.split(',').map(n => parseInt(n)))
        .map(([a, b]) => a * b)

    return sum(result);
}

function solvePart2(input: string): number {
    const commandPattern = /(?<!_)mul\((\d+,\d+)\)|don't\(\)|do\(\)/gi;
    const result = (input.match(commandPattern) || [])
    let enabled = true;
    let sum = 0;
    for (const command of result) {
        if (command === "don't()") {
            enabled = false;
        } else if (command === "do()") {
            enabled = true;
        } else if (enabled) {
            const [r] = command.match(/(\d+),(\d+)/g)!
            sum += product(r.split(',').map(n => parseInt(n)));
        }
    }
    return sum;
}

console.table({
    'sample1': solvePart1(sample1),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample2),
    'input2:': solvePart2(input),
})
