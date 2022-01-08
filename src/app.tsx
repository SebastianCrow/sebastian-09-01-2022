import React from 'react';
import { OrderBook } from './packages/orderBook';
import { NotificationProvider } from './packages/ui/notification/notificationProvider.component';
import { StoreProvider } from './shared/storeProvider.component';
import { IntlProvider } from 'react-intl';
import {
  CURRENT_LOCALE,
  DEFAULT_LOCALE,
  translations,
} from './translations/translations';

function App() {
  return (
    <StoreProvider>
      <IntlProvider
        locale={CURRENT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={translations}
      >
        <NotificationProvider>
          <OrderBook />
        </NotificationProvider>
      </IntlProvider>
    </StoreProvider>
  );
}

export default App;
