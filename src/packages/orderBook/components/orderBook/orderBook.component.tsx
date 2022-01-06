import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBook.component.module.scss';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundColor: 'red' }}>
        <div className={styles.title} style={{ backgroundColor: 'green' }}>
          Order Book
        </div>
        <div className={cns(styles.spreadContainer, 'desktop')}>
          <SpreadHeader />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div
          className={styles.tableColumn}
          style={{ backgroundColor: 'orange' }}
        >
          Column1
        </div>
        <div className={cns(styles.spreadContainer, 'mobile')}>
          <SpreadHeader />
        </div>
        <div
          className={styles.tableColumn}
          style={{ backgroundColor: 'yellow' }}
        >
          Column2
        </div>
      </div>
    </div>
  );
};
