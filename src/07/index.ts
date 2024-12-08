import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {sum} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


type RecursiveSolveResult = { equation: string, result: number };

function solvePart1(input: string): number {
    const testValues = input.split('\n').map((line) => {
        const [testValue, rest] = line.split(': ');

        return {
            testValue: parseInt(testValue),
            equation: rest.split(' ').map(Number)
        }
    });

    const operators = ['+', '*'];

    function recursiveSolve(remainingArguments: number[], equation: string): RecursiveSolveResult[] {
        const results: RecursiveSolveResult[] = [];
        if (remainingArguments.length === 1) {
            return [{
                equation,
                result: remainingArguments[0]
            }];
        }

        for (const operator of operators) {
            const newEquation = equation + operator + remainingArguments[1];

            let operationResult = 0;
            switch (operator) {
                case '+':
                    operationResult = remainingArguments[0] + remainingArguments[1];
                    break;
                case '*':
                    operationResult = remainingArguments[0] * remainingArguments[1];
                    break;
            }
            results.push(
                ...recursiveSolve(
                    [operationResult, ...remainingArguments.slice(2)],
                    newEquation
                )
            )
        }


        return results;
    }

    let result = 0;
    for (const testValue of testValues) {
        let data = recursiveSolve(testValue.equation, `${testValue.equation[0]}`);
        const solvable = data.map((data) => data.result).includes(testValue.testValue);
        if (solvable) {
            result += testValue.testValue;
        }
    }

    return result;
}

function solvePart2(input: string): number {
    const testValues = input.split('\n').map((line) => {
        const [testValue, rest] = line.split(': ');

        return {
            testValue: parseInt(testValue),
            equation: rest.split(' ').map(Number)
        }
    });

    const operators = ['+', '*', '||'];

    function recursiveSolve(remainingArguments: number[], equation: string): RecursiveSolveResult[] {
        const results: RecursiveSolveResult[] = [];
        if (remainingArguments.length === 1) {
            return [{
                equation,
                result: remainingArguments[0]
            }];
        }

        for (const operator of operators) {
            const newEquation = equation + operator + remainingArguments[1];

            let operationResult = 0;
            switch (operator) {
                case '+':
                    operationResult = remainingArguments[0] + remainingArguments[1];
                    break;
                case '*':
                    operationResult = remainingArguments[0] * remainingArguments[1];
                    break;
                case '||':
                    operationResult = parseInt(`${remainingArguments[0]}${remainingArguments[1]}`);
                    break;
            }
            results.push(
                ...recursiveSolve(
                    [operationResult, ...remainingArguments.slice(2)],
                    newEquation
                )
            )
        }


        return results;
    }

    let result = 0;
    for (const testValue of testValues) {
        let data = recursiveSolve(testValue.equation, `${testValue.equation[0]}`);
        const solvable = data.map((data) => data.result).includes(testValue.testValue);
        if (solvable) {
            result += testValue.testValue;
        }
    }

    return result;
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
