// TODO: Tests and handling edge cases
export const roundToDecimalPoints = (value: number, decimalPoints: number) => {
  const multiplier = Math.pow(10, decimalPoints);
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
};

export const computePercent = (a: number, b: number): number => {
  return (a * 100) / b;
};
