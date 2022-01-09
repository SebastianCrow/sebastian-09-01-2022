// TODO: Use real logger mechanism

/**
 * Log {@param params} with the `debug` severity
 * @param params Params to log
 */
export const logDebug = (...params: unknown[]) => {
  console.debug(...params);
};

/**
 * Log {@param params} with the `error` severity
 * @param params Params to log
 */
export const logError = (...params: unknown[]) => {
  console.error(...params);
};
