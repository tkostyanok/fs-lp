import { describe, expect, it, test } from 'vitest';
import { getModificationsFromSimpleObjects, isEmptyObject } from './object';

describe('getModificationsFromSimpleObjects', () => {
  test('returns empty object when initial and updated are identical (primitives)', () => {
    const initial = { a: 1, b: 'x' };
    const updated = { a: 1, b: 'x' };
    expect(getModificationsFromSimpleObjects(initial, updated)).toEqual({});
  });

  test('returns only changed primitive keys', () => {
    const initial = { a: 1, b: 'x' };
    const updated = { a: 2, b: 'x' };
    expect(getModificationsFromSimpleObjects(initial, updated)).toEqual({ a: 2 });
  });

  test('handles nested objects using deep equality (no change)', () => {
    const initial = { a: { x: 1, y: 2 }, b: 'ok' };
    const updated = { a: { x: 1, y: 2 }, b: 'ok' };
    expect(getModificationsFromSimpleObjects(initial, updated)).toEqual({});
  });

  test('detects changes inside nested objects', () => {
    const initial = { a: { x: 1, y: 2 }, b: 'ok' };
    const updated = { a: { x: 9, y: 2 }, b: 'ok' };
    expect(getModificationsFromSimpleObjects(initial, updated)).toEqual({ a: { x: 9, y: 2 } });
  });

  test('handles arrays (deep equality) and returns changed arrays', () => {
    const initial = { list: [1, 2, 3] };
    const updatedSame = { list: [1, 2, 3] };
    const updatedChanged = { list: [1, 2, 4] };

    expect(getModificationsFromSimpleObjects(initial, updatedSame)).toEqual({});
    expect(getModificationsFromSimpleObjects(initial, updatedChanged)).toEqual({ list: [1, 2, 4] });
  });

  test('does not mutate the updated object', () => {
    const initial = { a: 1 };
    const updated = { a: 1, b: 2 };
    const updatedCopy = { ...updated };
    getModificationsFromSimpleObjects(initial, updated);
    expect(updated).toEqual(updatedCopy);
  });
});

describe('isEmptyObject', () => {
  it('should return true when object is empty', () => {
    const data = {};
    const result = isEmptyObject(data);
    expect(result).toBe(true);
  });

  it('should return false when object has properties', () => {
    const data = { name: 'John', age: 25 };
    const result = isEmptyObject(data);
    expect(result).toBe(false);
  });

  it('should return false when object has nested empty objects', () => {
    const data = { person: { address: {}, hobbies: {} } };
    const result = isEmptyObject(data);
    expect(result).toBe(false);
  });

  it('should return true when object is null', () => {
    const data = null;
    const result = isEmptyObject(data);
    expect(result).toBe(true);
  });

  it('should return true when object is undefined', () => {
    const data = undefined;
    const result = isEmptyObject(data);
    expect(result).toBe(true);
  });

  it('should return false when object has a property with value null', () => {
    const data = { name: null };
    const result = isEmptyObject(data);
    expect(result).toBe(false);
  });
});
