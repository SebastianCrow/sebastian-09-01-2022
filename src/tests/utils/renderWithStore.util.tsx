import { render } from '@testing-library/react';
import { AppProviders } from '../../packages/app/components/appProviders';
import React, { ReactElement } from 'react';
import { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../shared/state/rootReducer';

export const renderWithStore = (
  Component: ReactElement,
  store: MockStoreEnhanced<AppState>
) => {
  return render(<AppProviders store={store}>{Component}</AppProviders>);
};
