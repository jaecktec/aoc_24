import {readFile} from 'node:fs/promises'
import {resolve} from "node:path";

const baseDir = resolve(import.meta.dirname)

const sample = (await readFile(resolve(baseDir, 'input', 'sample.txt'))).toString();
const input = (await readFile(resolve(baseDir, 'input', 'input.txt'))).toString();


function parseReport(input: string) {
    return input.split('\n').map(line => line.split(' ').map(m => parseInt(m)));
}

function isReportValid(report: number[]) {
    let previous = report[0];
    let valid = true;
    let previousDirection: 'up' | 'down' = report[0] < report[1] ? 'up' : 'down';
    for (let i = 1; i < report.length; i++) {
        let difference = Math.max(previous, report[i]) - Math.min(previous, report[i]);
        let direction: 'up' | 'down' = previous < report[i] ? 'up' : 'down';
        if (difference < 1 || difference > 3 || direction !== previousDirection) {
            valid = false;
            break;
        }
        previous = report[i];
    }
    return valid;
}

function solvePart1(input: string): number {
    const reports = parseReport(input);
    let safeReports = 0;
    for (const report of reports) {
        const valid = isReportValid(report)
        if (valid) {
            safeReports++;
        }
    }


    return safeReports;
}

function solvePart2(input: string): number {
    const reports = parseReport(input);
    let safeReports = 0;
    for (const report of reports) {
        let valid = isReportValid(report);
        if (valid) {
            console.log(report.join(', '), `safe without removing any level`);
            safeReports++;
        } else {
            // remove element one by one
            let dampenedValid = false;
            for (let idx = 0; idx < report.length; idx++) {
                const dampenedReport = report.slice();
                dampenedReport.splice(idx, 1);
                const valid = isReportValid(dampenedReport);
                if (valid) {
                    console.log(report.join(', '), `safe by removing the ${idx + 1} level ${report[idx]}`);
                    safeReports++;
                    dampenedValid = true;
                    break;
                }
            }
            if (!dampenedValid) {
                console.log(report.join(', '), 'Unsafe', '\t');
            }
        }
    }
    return safeReports;
}

console.table({
    'sample1': solvePart1(sample),
    'input1:': solvePart1(input),
    'sample2:': solvePart2(sample),
    'input2:': solvePart2(input),
})
