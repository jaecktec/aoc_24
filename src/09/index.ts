import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";
import {insertElementAt, removeElementAt, sum} from "../util/array-utils.js";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();

let printOutput = false;

function log(fn: () => any[] | any) {
    if (printOutput) {
        console.log(fn());
    }
}

function solvePart1(input: string): number {
    const inputNumbers = [...input].map(it => parseInt(it));
    const filesystem: (number | undefined)[] = [];
    for (const [index, inputElement] of inputNumbers.entries()) {
        for (let i = 0; i < inputElement; i++) {
            if (index % 2 === 0) {
                filesystem.push(index / 2);
            } else {
                filesystem.push(undefined);
            }
        }
    }

    while (filesystem.includes(undefined)) {
        const index = filesystem.indexOf(undefined);
        filesystem[index] = filesystem[filesystem.length - 1];
        filesystem.length -= 1;

        // cleanup
        while (filesystem[filesystem.length - 1] === undefined) {
            filesystem.length -= 1;
        }

        // console.log(filesystem.map(it => it === undefined ? '.' : it).join(''));
    }

    return sum(filesystem.map((it, index) => (it as number) * index));
}

function normaliseFs(filesystem: { free: number; occupied: number; id: number }[]) {
    const fs: (number | undefined)[] = [];
    for (const filesystemElement of filesystem) {
        for (let i = 0; i < filesystemElement.occupied; i++) {
            fs.push(filesystemElement.id);
        }
        for (let i = 0; i < filesystemElement.free; i++) {
            fs.push(undefined);
        }
    }
    return fs;
}

// horrible inefficient but works :shrug:
function solvePart2(input: string): number {
    const inputNumbers = [...input].map(it => parseInt(it));
    const filesystem: { free: number, occupied: number, id: number }[] = [];
    for (const [index, inputElement] of inputNumbers.entries()) {
        if (index % 2 === 0) {
            filesystem.push({id: index / 2, occupied: inputElement, free: inputNumbers[index + 1] || 0});
        }
    }

    const ogFs = structuredClone(filesystem)
        // .map((it, index) => ({...it, index}))
        .reverse();

    for (const [idx, mc] of ogFs.entries()) {
        if (idx % 100 === 0) {
            console.log(`progress: ${idx}/${ogFs.length}`)
        }
        for (const filesystemElement of filesystem) {
            if (filesystemElement.free < 0) continue;
            const moveCandidate = filesystem.find(it => it.id === mc.id)!;
            if (filesystemElement.id === moveCandidate.id) break;
            if(filesystemElement.free < moveCandidate.occupied) continue;

            let positionOfElementToMove = filesystem.findIndex(it => it.id === moveCandidate.id);
            filesystem[positionOfElementToMove - 1].free += moveCandidate.occupied + moveCandidate.free
            removeElementAt(filesystem, positionOfElementToMove);
            insertElementAt(filesystem, {
                ...moveCandidate,
                free: filesystemElement.free - moveCandidate.occupied,
            }, filesystem.indexOf(filesystemElement) + 1);
            filesystemElement.free = 0;
            break;
        }
    }

    const fs = normaliseFs(filesystem);

    return sum(fs.map((it, index) => (it || 0) * index));
}

console.table({
    // 'sample1': solvePart1(sample),
    // 'input1:': solvePart1(input),
    // 'sample-reddit-res-16': solvePart2('14113'),
    // 'sample-reddit-res-385': solvePart2('1010101010101010101010'),
    // 'sample-reddit-res-100': solvePart2('1111223'),
    'sample-reddit-res-169': solvePart2('1313165'),
    // 'sample-2858:': solvePart2(sample),
    'input2:': (() => {
        printOutput = false;
        return solvePart2(input);  // 95905437370 too low, 106825519752, 9900712144429 nope
    })(),
})
