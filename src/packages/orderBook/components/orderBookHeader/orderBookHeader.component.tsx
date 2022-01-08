import React, { FunctionComponent } from 'react';
import { Text } from '../../../ui/text/text.component';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBookHeader.component.module.scss';

export const OrderBookHeader: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Text variant="title">Order Book</Text>
      </div>
      <div className={cns(styles.spreadContainer, 'desktop')}>
        <SpreadHeader />
      </div>
    </div>
  );
};
