/* eslint-disable no-param-reassign */

/**
 * Groups an array by a given value
 * @category Helpers
 * @param {Object}[] array of objects
 * @param {String}key key to be sorted with
 * @param {String} keyName name of the key in the return array
 * @param {String} valueName name of the value in the return array
 * @returns {Object}[] array of groups of objects
 */
const groupByKey = (array, key, keyName, valueName) => array.reduce((all, current) => {
  const v = key instanceof Function ? key(current) : current[key];

  delete current[key];

  const el = all.find((r) => r && r[keyName] === v);
  if (el) {
    el[valueName].push(current);
  } else {
    all.push({ [keyName]: v, [valueName]: [current] });
  }
  return all;
}, []);


/**
 * Converts a string to titlecase
 * @category Helpers
 * @param {String}text text to be converted into titlecase
 * @returns {String} text converted into titlecase
 */
const convertToTitleCase = (text) => {
  if (text === undefined || text === null) return null;
  const articles = ['a', 'an', 'the', 'of', 'in', 'for', 'on'];
  const words = text.trim().split(' ');
  return words.reduce((all, current, index) => {
    if (index !== 0 && articles.includes(current.toLowerCase())) {
      all += `${current.toLowerCase()}`;
    } else {
      all += `${current.charAt(0).toUpperCase() + current.slice(1).toLowerCase()}`;
    }
    if (index !== words.length - 1) all += ' ';
    return all;
  }, '');
};


/**
 * Compares two arrays
 * @param {Object[]} array1
 * @param {Object[]} array2
 * @returns {boolean} true if equal false otherwise
 */
const compareTwoArrays = (
  array1, array2,
) => (array1.length === array2.length) && (array1.every((val) => array2.includes(val)));


/**
 * Formats response object by removing timestamp elements
 * @param {Object} responseObject
 * @returns {Object} formatted responseObject
 */
const formatResponse = (responseObject) => {
  const formatObject = (responseObject.dataValues) ? responseObject.dataValues : responseObject;
  delete formatObject.createdAt;
  delete formatObject.updatedAt;
  delete formatObject.deletedAt;

  return formatObject;
};

/**
 *
 * @param {String} old
 * @param {String} new
 * @param {Object} object to be altered
 * @returns {Object} altered object
 * */
const changeObjectLabel = (oldLabel, newLabel, object) => {
  object[newLabel] = object[oldLabel];
  delete object[oldLabel];
  return object;
};

/**
 * Returns true if second parameter is a subset of the first parameter
 * @param {String[]} set
 * @param {String} subset
 * #returns boolean is subset
 */
const isSubset = (set, subset) => subset.every((subItem) => set.some((item) => item === subItem));

module.exports = {
  groupByKey, convertToTitleCase, compareTwoArrays, formatResponse, changeObjectLabel, isSubset,
};
