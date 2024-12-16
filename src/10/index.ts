import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function parseHikingTrails(input: string) {
    const map = Object.freeze(input.split('\n')
        .map(n => [...n])
        .map(n => n
            // support test input with dots
            .map(m => m === '.' ? -Infinity : parseInt(m))
        )
        .map(n => Object.freeze(n)));

    let result = 0;

    function moveThroughMap([startI, startJ]: [number, number], path: [number, number][]): [number, number][][] {
        const startValue = map[startI][startJ];
        const possibleDirections = [
            [startI + 1, startJ],
            [startI - 1, startJ],
            [startI, startJ + 1],
            [startI, startJ - 1],
        ]
            .filter(([i, j]) => map[i]?.[j] !== undefined)
            .filter(([i, j]) => map[i]?.[j] === startValue + 1);

        if (possibleDirections.length === 0) {
            return [path];
        }
        if (possibleDirections.length > 1) {
            result++;
        }

        return possibleDirections.map(([i, j]) => {
            return moveThroughMap([i, j], [...path, [i, j]]);
        }).flat();
    }

    // find all coordinates of 0
    const startCoordinates = map.flatMap((row, i) => row.map((value, j) => [i, j]).filter(([i, j]) => map[i][j] === 0));
    const paths = startCoordinates.map(([i, j]) => moveThroughMap([i, j], [[i, j]])).flat();

    return paths
        .filter(path => {
            const resolvedPath = path.map(([i, j]) => map[i][j])
            return resolvedPath[0] === 0 && resolvedPath[resolvedPath.length - 1] === 9 && resolvedPath.length === 10;
        });
}

function solvePart1(input: string): number {
    const hikingTrails = parseHikingTrails(input);

    const nonRedundantTrails = new Set(hikingTrails.map(trail => [trail[0], trail[9]]).map(([start, end]) => start.join('-') + ' -> ' + end.join('-')));

    console.log(nonRedundantTrails)
    return nonRedundantTrails.size;
}

function visualiseHikingTrails(map: [number, number][], hikingTrails: FlatArray<[number, number][][][], 1>[]) {
    for (const path of hikingTrails) {
        console.log('-----------')
        const emptyMap = new Array(map.length).fill('.').map(() => new Array(map[0].length).fill('.'));
        for (const [i, j] of path) {
            emptyMap[i][j] = `${map[i][j]}`;
        }
        console.log(emptyMap.map(n => n.join('')).join('\n'));
    }
}

function solvePart2(input: string): number {
    let hikingTrails = parseHikingTrails(input);

    // visualise paths
    // visualiseHikingTrails(hikingTrails);

    // console.log(nonRedundantTrails)
    return hikingTrails.length;
    // return sum([...tailHeads.values()])
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
