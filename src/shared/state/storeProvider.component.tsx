import React, { FunctionComponent, useMemo } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import { Store } from '@reduxjs/toolkit';

interface StoreProviderProps {
  store?: Store;
}

export const StoreProvider: FunctionComponent<StoreProviderProps> = ({
  store,
  children,
}) => {
  const configuredStore = useMemo(() => configureStore(), []);
  return <Provider store={store ?? configuredStore}>{children}</Provider>;
};
