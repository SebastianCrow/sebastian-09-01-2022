import { create } from 'react-test-renderer';
import { AppProviders } from '../../packages/app/components/appProviders';
import React, { ReactElement } from 'react';
import { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../shared/state/rootReducer';

/**
 * Wrap {@param Component} with renderer using given or default store
 * @param Component Component to wrap
 * @param store Store
 */
export const createRendererWithStore = (
  Component: ReactElement,
  store: MockStoreEnhanced<AppState>
) => {
  return create(<AppProviders store={store}>{Component}</AppProviders>, {
    // Required for Mui library testing: https://github.com/mui-org/material-ui/issues/17119#issuecomment-524266401
    createNodeMock: (node) => {
      return document.createElement(node.type as string);
    },
  });
};
