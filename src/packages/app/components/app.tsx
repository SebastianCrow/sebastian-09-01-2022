import React, { FunctionComponent } from 'react';
import { OrderBook } from '../../orderBook';
import { AppProviders } from './appProviders';

export const App: FunctionComponent = () => {
  return (
    <AppProviders>
      <OrderBook />
    </AppProviders>
  );
};
