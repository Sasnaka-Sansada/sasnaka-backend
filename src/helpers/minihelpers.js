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
  const articles = ['a', 'an', 'the', 'of', 'in', 'for', 'on'];
  const words = text.trim().split(' ');
  return words.reduce((all, current, index) => {
    if (index !== 0 && articles.includes(current.toLowerCase())) {
      all += `${current.toLowerCase()}`;
    } else {
      all += `${current.charAt(0).toUpperCase() + current.slice(1)}`;
    }
    if (index !== words.length - 1) all += ' ';
    return all;
  }, '');
};

const compareTwoArrays = (
  array1, array2,
) => (array1.length === array2.length) && (array1.every((val) => array2.includes(val)));

module.exports = { groupByKey, convertToTitleCase, compareTwoArrays };
