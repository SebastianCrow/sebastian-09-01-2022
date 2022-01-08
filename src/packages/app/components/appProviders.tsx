import React, { FunctionComponent } from 'react';
import { Store } from '@reduxjs/toolkit';
import { IntlProvider } from 'react-intl';
import { NotificationProvider } from '../../ui/notification/notificationProvider.component';
import { StoreProvider } from '../../../shared/state/storeProvider.component';
import {
  CURRENT_LOCALE,
  DEFAULT_LOCALE,
  translations,
} from '../../../translations/translations';

interface AppProvidersProps {
  store?: Store;
}

export const AppProviders: FunctionComponent<AppProvidersProps> = ({
  store,
  children,
}) => {
  return (
    <StoreProvider store={store}>
      <IntlProvider
        locale={CURRENT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={translations}
      >
        <NotificationProvider>{children}</NotificationProvider>
      </IntlProvider>
    </StoreProvider>
  );
};
