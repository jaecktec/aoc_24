import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


type GuardState = '^' | 'v' | '>' | '<';
type TerrainState = '.' | '#';
type MapState = TerrainState | GuardState;

const POSSIBLE_GUARD_STATES: GuardState[] = ['^', 'v', '>', '<'];

function solvePart1(input: string): number {
    const map: MapState[][] = input.split('\n').map(line => [...line]) as any;
    // find Guard starting position
    let guardPos: [number, number, GuardState] = [0, 0, 'v'];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (POSSIBLE_GUARD_STATES.includes(map[i][j] as any)) {
                guardPos = [i, j, map[i][j] as GuardState];
                break;
            }
        }
    }
    const visitedPositions: Set<string> = new Set();
    while (true) {
        // move guard in the direction it is facing
        let [i, j, state] = guardPos;
        // check if there is an obstacle (#) in the direction the guard is facing
        const nextPos: {[k in GuardState]: [number, number]} = {
            '^': [i - 1, j],
            'v': [i + 1, j],
            '>': [i, j + 1],
            '<': [i, j - 1],
        }
        if (map[nextPos[state][0]]?.[nextPos[state][1]] === '#') {
            // turn right
            const nextStates: {[_ in GuardState]: GuardState} = {
                '^': '>',
                '>': 'v',
                'v': '<',
                '<': '^',
            }
            guardPos = [i, j, nextStates[state]];
        }else {
            // move forward
            guardPos = [nextPos[state][0], nextPos[state][1], state];
        }

        // if out of bound, break
        if (guardPos[0] < 0 || guardPos[0] >= map.length || guardPos[1] < 0 || guardPos[1] >= map[0].length) {
            break;
        }

        visitedPositions.add(`${guardPos[0]}-${guardPos[1]}`);
    }

    for (const visitedPosition of visitedPositions) {
        const [i, j] = visitedPosition.split('-').map(Number);
        map[i][j] = 'X' as any;
    }
    // console.table(map);


    return visitedPositions.size;
}

function checkForLoop(initialPos: [number, number, "^" | "v" | ">" | "<"], map: MapState[][], extraObstacle: [number, number]): {
    visitedPositions: Set<string>;
    looped: boolean
} {
    let guardPos: [number, number, GuardState] = initialPos.slice() as any;
    const visitedPositions: Set<string> = new Set();
    const visitedVectors: Set<string> = new Set();
    while (true) {
        // move guard in the direction it is facing
        let [i, j, state] = guardPos;
        // check if there is an obstacle (#) in the direction the guard is facing
        const nextPos: { [k in GuardState]: [number, number] } = {
            '^': [i - 1, j],
            'v': [i + 1, j],
            '>': [i, j + 1],
            '<': [i, j - 1],
        }
        if (
            map[nextPos[state][0]]?.[nextPos[state][1]] === '#'
            || (extraObstacle[0] === nextPos[state][0] && extraObstacle[1] === nextPos[state][1])
        ) {
            // turn right
            const nextStates: { [_ in GuardState]: GuardState } = {
                '^': '>',
                '>': 'v',
                'v': '<',
                '<': '^',
            }
            guardPos = [i, j, nextStates[state]];
        } else {
            // move forward
            guardPos = [nextPos[state][0], nextPos[state][1], state];
        }

        // if out of bound, break
        if (guardPos[0] < 0 || guardPos[0] >= map.length || guardPos[1] < 0 || guardPos[1] >= map[0].length) {
            break;
        }
        if (visitedVectors.has(guardPos.join('-'))) {
            return {visitedPositions, looped: true};
        }

        visitedVectors.add(guardPos.join('-'));
        visitedPositions.add(`${guardPos[0]}-${guardPos[1]}`);
    }
    return {visitedPositions, looped: false};
}

function solvePart2(input: string): number {
    const map: MapState[][] = input.split('\n').map(line => [...line]) as any;
    // find Guard starting position
    let startingPosition: [number, number, GuardState] = [0, 0, 'v'];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (POSSIBLE_GUARD_STATES.includes(map[i][j] as any)) {
                startingPosition = [i, j, map[i][j] as GuardState];
                break;
            }
        }
    }
    const {visitedPositions} = checkForLoop(startingPosition, map, [NaN, NaN]);

    let loops = 0;
    for (const visitedPosition of visitedPositions) {
        const [i, j] = visitedPosition.split('-').map(Number);
        if (checkForLoop(startingPosition, map, [i, j]).looped) {
            loops++;
        }
    }
    // console.table(map);


    return loops;
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
