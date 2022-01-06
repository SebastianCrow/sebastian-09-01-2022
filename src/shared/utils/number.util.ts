// TODO: Tests and handling edge cases
export const roundToDecimalPoints = (value: number, decimalPoints: number) => {
  const multiplier = Math.pow(10, decimalPoints);
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
};
