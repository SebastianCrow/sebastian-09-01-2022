import React from 'react';
import { OrderBook } from './packages/orderBook';
import { NotificationProvider } from './packages/ui/notification/notificationProvider.component';
import { StoreProvider } from './shared/storeProvider.component';

function App() {
  return (
    <StoreProvider>
      <NotificationProvider>
        <OrderBook />
      </NotificationProvider>
    </StoreProvider>
  );
}

export default App;
