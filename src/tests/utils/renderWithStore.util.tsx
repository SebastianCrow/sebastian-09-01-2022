import { render } from '@testing-library/react';
import { AppProviders } from '../../packages/app/components/appProviders.component';
import React, { ReactElement } from 'react';
import { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../shared/state/rootReducer';

/**
 * Render {@param Component} wrapped with given or default store using `@testing-library/react` to the DOM tree
 * @param Component Component to render
 * @param store Store
 */
export const renderWithStore = (
  Component: ReactElement,
  store: MockStoreEnhanced<AppState>
) => {
  return render(<AppProviders store={store}>{Component}</AppProviders>);
};
