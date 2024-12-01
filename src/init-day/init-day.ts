import {mkdir, writeFile} from 'node:fs/promises'
import {input} from '@inquirer/prompts';
import {resolve} from 'node:path';

const baseDir = resolve(import.meta.dirname, '../')
console.log(baseDir)
const day = parseInt(await input({message: 'Enter day'})).toString().padStart(2, '0');

await mkdir(resolve(baseDir, day))
await mkdir(resolve(baseDir, day, 'input'))
await writeFile(resolve(baseDir, day, 'input', 'sample.txt'), '');
await writeFile(resolve(baseDir, day, 'input', 'input.txt'), '');
await writeFile(resolve(baseDir, day, 'index.ts'), `import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function solvePart1(input: string): number {
   
    return 0;
}

function solvePart2(input: string): number {
    return 0;
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
`)
