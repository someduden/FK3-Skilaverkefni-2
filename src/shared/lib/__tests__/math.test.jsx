import { describe, it, expect } from 'vitest';
import { generateFibonacci } from './fibonacci'

describe('calculations', () => {
    it('adds two numbers correctly', () => {
        expect(1 + 1).toEqual(2);
    })

    it('generateFibonacci', () => {
        expect(generateFibonacci(5)).toEqual([0, 1, 1, 2, 3]);
        expect(generateFibonacci(7)).toEqual([0, 1, 1, 2, 3, 5, 8]);
    })
})