import {describe, test} from 'node:test'
import {matchesPattern} from "./array-utils.js";
import * as assert from "node:assert";

describe('array-util-test', () => {
    describe('pattern match', () => {
        test('check-small-pattern-match', () => {
            // Arrange
            const matrix = [
                ['M', 'B', 'S'],
                ['B', 'A', 'B'],
                ['M', 'B', 'S'],
            ]
            const pattern = [
                ['M', undefined, 'S'],
                [undefined, 'A', undefined],
                ['M', undefined, 'S'],
            ]
            // Act
            const result = matchesPattern(matrix, pattern, 0, 0);
            // Assert
            assert.equal(result, true, 'should match pattern')
        })
        test('check-small-pattern-not-match', () => {
            // Arrange
            const matrix = [
                ['M', 'B', 'S'],
                ['B', 'B', 'B'],
                ['M', 'B', 'S'],
            ]
            const pattern = [
                ['M', undefined, 'S'],
                [undefined, 'A', undefined],
                ['M', undefined, 'S'],
            ]
            // Act
            const result = matchesPattern(matrix, pattern, 0, 0);
            // Assert
            assert.equal(result, false, 'should not match pattern')
        })
        test('check-offset-pattern-match', () => {
            // Arrange
            const matrix = [
                ['B', 'B', 'B', 'B'],
                ['B', 'M', 'B', 'S'],
                ['B', 'B', 'A', 'B'],
                ['B', 'M', 'B', 'S'],
            ]
            const pattern = [
                ['M', undefined, 'S'],
                [undefined, 'A', undefined],
                ['M', undefined, 'S'],
            ]
            // Act
            const result = matchesPattern(matrix, pattern, 1, 1);
            // Assert
            assert.equal(result, true, 'should match pattern')
        })
        test('check-non-square-pattern-match', () => {
            // Arrange
            const matrix = [
                ['B', 'B', 'B', 'B'],
                ['B', 'B', 'B', 'B'],
                ['B', 'M', 'B', 'S'],
                ['B', 'B', 'A', 'B'],
                ['B', 'M', 'B', 'S'],
            ]
            const pattern = [
                ['M', undefined, 'S'],
                [undefined, 'A', undefined],
                ['M', undefined, 'S'],
            ]
            // Act
            const result = matchesPattern(matrix, pattern, 1, 2);
            // Assert
            assert.equal(result, true, 'should match pattern')
        })
    });
});