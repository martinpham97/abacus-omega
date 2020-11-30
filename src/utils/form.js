/**
 * Function to convert form input string to a number.
 * If the input string is not a number, null is returned.
 * @param {String} value Input string
 */
export const transformStringToNum = (value) => {
  const output = parseInt(value, 10);
  return isNaN(output) ? null : output;
};
