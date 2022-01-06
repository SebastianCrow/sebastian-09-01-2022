export const replaceAtIndex = <T>(
  array: T[],
  element: T,
  index: number
): T[] => {
  return array
    .slice(0, index)
    .concat(element)
    .concat(array.slice(index + 1));
};

export const removeAtIndex = <T>(array: T[], index: number): T[] => {
  return array.slice(0, index).concat(array.slice(index + 1));
};
