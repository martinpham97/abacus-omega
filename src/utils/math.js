export const getPercentage = (number, total) =>
  parseFloat(((number / total) * 100).toFixed(2));

export const getPercentageOf = (number, percentage) =>
  parseFloat(((number * percentage) / 100).toFixed(2));
