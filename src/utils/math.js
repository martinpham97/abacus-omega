export const getPercentage = (number, total) =>
  Math.round((number / total) * 100);

export const getPercentageOf = (number, percentage) =>
  Math.round((number * percentage) / 100);
