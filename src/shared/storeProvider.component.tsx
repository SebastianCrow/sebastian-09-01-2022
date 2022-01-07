import React, { FunctionComponent, useMemo } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './state/configureStore';

export const StoreProvider: FunctionComponent = ({ children }) => {
  const store = useMemo(() => configureStore(), []);
  return <Provider store={store}>{children}</Provider>;
};
