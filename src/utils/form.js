export const nullableNumberTransform = (value, originalValue) =>
  originalValue.trim() === "" ? null : value;
