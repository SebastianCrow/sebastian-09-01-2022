import { create } from 'react-test-renderer';
import { AppProviders } from '../../packages/app/components/appProviders';
import React, { ReactElement } from 'react';
import { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../shared/state/rootReducer';

export const createRendererWithStore = (
  Component: ReactElement,
  store: MockStoreEnhanced<AppState>
) => {
  return create(<AppProviders store={store}>{Component}</AppProviders>);
};
