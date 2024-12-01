import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {sum} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();

function parseList(input: string) {
    const list = input
        .split('\n')
        .map(it => it
            .split('   ')
            .map(s => parseInt(s))
        );
    const [leftList, rightList] = list.reduce((res, curr) => {
        res[0].push(curr[0])
        res[1].push(curr[1])
        return res;
    }, [[], []] as [number[], number[]]);
    return {leftList, rightList};
}

function solvePart1(input: string): number {
    const {leftList, rightList} = parseList(input);

    const sortedLeftList = leftList.slice().sort((a, b) => a - b);
    const sortedRightList = rightList.slice().sort((a, b) => a - b);

    const distances = sortedLeftList
        .map((it, idx) => Math.max(it, sortedRightList[idx]) - Math.min(it, sortedRightList[idx]));
    return sum(distances);
}

function solvePart2(input: string): number {
    const {leftList, rightList} = parseList(input);
    const sortedRightList = rightList.slice().sort((a, b) => a - b);

    function countNumber(number: number, sortedArray: number[]) {
        let lastIndexOf = sortedArray.lastIndexOf(number);
        if (lastIndexOf < 0) return 0;
        return (lastIndexOf - sortedArray.indexOf(number)) + 1;
    }

    const similarityScores = leftList.map(n => n * countNumber(n, sortedRightList));

    return sum(similarityScores);
}


console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
