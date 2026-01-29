import {
  describe, expect,it 
} from 'vitest';

import { descendingComparator } from './helper';

describe('descendingComparator', () => {
  it('returns 1 when b > a for numeric values', () => {
    const a = {
      value: 1 
    };
    const b = {
      value: 2 
    };
    expect(descendingComparator(a, b, 'value')).toBe(1);
  });

  it('returns -1 when b < a for numeric values', () => {
    const a = {
      value: 3 
    };
    const b = {
      value: 2 
    };
    expect(descendingComparator(a, b, 'value')).toBe(-1);
  });

  it('returns 0 when numeric values are equal', () => {
    const a = {
      value: 2 
    };
    const b = {
      value: 2 
    };
    expect(descendingComparator(a, b, 'value')).toBe(0);
  });

  it('returns 1 when b > a for string values', () => {
    const a = {
      label: 'a' 
    };
    const b = {
      label: 'b' 
    };
    expect(descendingComparator(a, b, 'label')).toBe(1);
  });

  it('returns -1 when b < a for string values', () => {
    const a = {
      label: 'c' 
    };
    const b = {
      label: 'b' 
    };
    expect(descendingComparator(a, b, 'label')).toBe(-1);
  });

  it('returns 0 when string values are equal', () => {
    const a = {
      label: 'same' 
    };
    const b = {
      label: 'same' 
    };
    expect(descendingComparator(a, b, 'label')).toBe(0);
  });

  it('handles boolean comparisons according to JS relational semantics', () => {
    const a = {
      flag: true 
    };
    const b = {
      flag: false 
    };
    // Note: JS: false < true is true => descendingComparator returns -1
    expect(descendingComparator(a, b, 'flag')).toBe(-1);
  });

  it('returns 0 when comparing undefined with a defined value (both < and > are false)', () => {
    const a = {
      maybe: undefined as unknown as number 
    };
    const b = {
      maybe: 1 
    };
    expect(descendingComparator(a, b, 'maybe')).toBe(0);
  });
});