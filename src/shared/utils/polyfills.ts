// Polyfill for IE (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
if (!Object.values) {
  Object.values = <T>(obj: { [s: string]: T }): T[] => {
    return Object.keys(obj).map((e) => obj[e]);
  };
}

// Polyfill for IE (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
if (!Array.prototype.includes) {
  Array.prototype.includes = function (search): boolean {
    return this.indexOf(search) !== -1;
  };
}

export {};
