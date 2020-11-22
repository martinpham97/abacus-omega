export const nullableNumberTransform = (value, originalValue) => {
  if (typeof originalValue === "string" || originalValue instanceof String) {
    return originalValue.trim() === "" ? null : value;
  }
  return value;
};

export const transformStringToNumConfig = {
  input: (value) => isNaN(value) || value.toString(),
  output: (e) => {
    const output = parseInt(e.target.value, 10);
    return isNaN(output) ? 0 : output;
  },
};
