/**
 * @name ensureStringArray
 * @param {v} - Set<string> | string[] | []
 * @description Converts a Set or array to an array of strings.
 * @returns {string[]} - An array of strings.
 */
export const ensureStringArray = (v?: Set<string> | string[] | []): string[] => {
  if (!v) return [];
  return v instanceof Set ? Array.from(v).flat(Infinity) : v.flat(Infinity);
};
