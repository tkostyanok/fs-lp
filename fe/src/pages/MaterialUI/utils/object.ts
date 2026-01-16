import isEqual from 'lodash/isEqual';

/**
 * @param {initial}: object - The initial data to compare.
 * @param {updated}: object - Updated data to compare.
 * @description Calculate (shallow) difference between an update version and initial object.
 * @returns {result}: object - Object updated data.
 */
export const getModificationsFromSimpleObjects = <T extends object>(initial: T, updated: T): T => {
  const result: T = {
    ...updated,
  };
  (Object.keys(updated) as Array<keyof T>).forEach((key) => {
    if (isEqual(updated[key], initial[key])) {
      delete result[key];
    }
  });
  return result;
};

/**
 * @name isEmptyObject
 * @param {data}: object - The initial data to compare.
 * @description Checks if an object is empty or not.
 * @returns {result}: boolean - true/false
 */
export const isEmptyObject = (data?: object | null) => {
  return (
    data === null ||
    data === undefined ||
    (Object.keys(data).length === 0 && Object.prototype.toString.call(data) === '[object Object]')
  );
};
