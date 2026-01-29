import {
  describe, expect,it 
} from 'vitest';

import { ensureStringArray } from './mixed';

describe('ensureStringArray', () => {
  it('returns empty array when called with no argument', () => {
    expect(ensureStringArray()).toEqual([]);
  });

  it('returns empty array when called with undefined explicitly', () => {
    expect(ensureStringArray(undefined)).toEqual([]);
  });

  it('returns empty array for an empty array input and does not return the same reference', () => {
    const arr: string[] = [];
    const result = ensureStringArray(arr);
    expect(result).toEqual([]);
    expect(result).not.toBe(arr);
  });

  it('returns a shallow copy for a flat array of strings', () => {
    const arr = [ 'a', 'b' ];
    const result = ensureStringArray(arr);
    expect(result).toEqual([ 'a', 'b' ]);
    expect(result).not.toBe(arr);
  });

  it('flattens nested arrays of strings to a single-level array (deep flatten)', () => {
    const nested = [ 'a', [ 'b', 'c' ], [ [ 'd' ] ] ] as unknown as string[];
    const result = ensureStringArray(nested);
    expect(result).toEqual([ 'a', 'b', 'c', 'd' ]);
  });

  it('converts a Set<string> to an array preserving insertion order', () => {
    const s = new Set<string>([ 'x', 'y' ]);
    const result = ensureStringArray(s);
    expect(result).toHaveLength(2);
    expect(result).toEqual([ 'x', 'y' ]);
  });

  it('returns empty array for an empty Set and does not mutate the Set', () => {
    const s = new Set<string>();
    const result = ensureStringArray(s);
    expect(result).toEqual([]);
    expect(s.size).toBe(0);
  });

  it('does not mutate the original array input (contents remain the same)', () => {
    const arr = [ 'p', [ 'q' ] ] as unknown as string[];
    const copyBefore = JSON.stringify(arr);
    const result = ensureStringArray(arr);
    const copyAfter = JSON.stringify(arr);
    expect(result).toEqual([ 'p', 'q' ]);
    expect(copyBefore).toBe(copyAfter);
  });
});