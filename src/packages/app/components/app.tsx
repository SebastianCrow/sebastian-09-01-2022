import React, { FunctionComponent } from 'react';
import { OrderBook } from '../../orderBook';
import { AppProviders } from './appProviders';

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
