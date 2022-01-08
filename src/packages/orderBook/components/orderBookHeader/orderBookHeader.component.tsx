import React, { FunctionComponent } from 'react';
import { Text } from '../../../ui/text/text.component';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBookHeader.component.module.scss';
import { FormattedMessage } from 'react-intl';

export const OrderBookHeader: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Text variant="title">
          <FormattedMessage id="Order Book" />
        </Text>
      </div>
      <div className={cns(styles.spreadContainer, 'desktop')}>
        <SpreadHeader />
      </div>
    </div>
  );
};
