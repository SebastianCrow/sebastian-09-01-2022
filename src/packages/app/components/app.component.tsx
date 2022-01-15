import React, { FunctionComponent } from 'react';
import { OrderBook } from '../../orderBook';
import { AppProviders } from './appProviders.component';

/**
 * Main component
 */
export const App: FunctionComponent = () => {
  return (
    <AppProviders>
      <OrderBook />
    </AppProviders>
  );
};
