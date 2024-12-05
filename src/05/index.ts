import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {sum} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function parseInput(input: string) {
    let lines = input.split('\n');
    const rules = lines.slice(0, lines.indexOf('')).map(r => {
        return r.split('|').map(it => parseInt(it));
    });
    const pageUpdates = lines.slice(lines.indexOf('') + 1).map(r => r.split(',').map(it => parseInt(it)));
    return {rules, pageUpdates};
}

function solvePart1(input: string): number {
    const {rules, pageUpdates} = parseInput(input);

    const updatesInOrder = pageUpdates.filter(pageUpdate => {
        for (const rule of rules) {
            if (pageUpdate.includes(rule[0]) && pageUpdate.includes(rule[1])) {
                if (pageUpdate.indexOf(rule[0]) >= pageUpdate.indexOf(rule[1])) {
                    return false
                }
            }
        }

        return true;
    });

    return sum(updatesInOrder.map(it => it[Math.floor(it.length / 2)]));
}

function solvePart2(input: string): number {
    const {rules, pageUpdates} = parseInput(input);

    const invalid = pageUpdates
        .filter(pageUpdate => {
            // filter out those who are already in correct order
            for (const rule of rules) {
                if (pageUpdate.includes(rule[0]) && pageUpdate.includes(rule[1])) {
                    if (pageUpdate.indexOf(rule[0]) >= pageUpdate.indexOf(rule[1])) {
                        return true;
                    }
                }
            }
            return false;
        });
    const updatesInOrder = invalid.map(page => {
        const relevantRules = rules.filter(rule => page.includes(rule[0]) && page.includes(rule[1]));
        return page.sort((a, b) => {
            const rule = relevantRules.find(rule => rule.includes(a) && rule.includes(b));
            if (!rule) return 0;
            // negative is a is before b
            if (a === rule[0]){
                return -1;
            }else if(b === rule[0]){
                return 1;
            }

            return 0;
        });
    })

    return sum(updatesInOrder.map(it => it[Math.floor(it.length / 2)]));
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
