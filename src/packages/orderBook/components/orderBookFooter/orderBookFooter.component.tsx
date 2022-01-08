import React, { FunctionComponent, useCallback } from 'react';
import styles from './orderBookFooter.component.module.scss';
import { Button } from '../../../ui/button/button.component';
import { useConnectionManager } from '../../hooks/useConnectionManager.hook';
import { useSelectOrderBookState } from '../../hooks/useSelectOrderBookState.hook';

export const OrderBookFooter: FunctionComponent = () => {
  const { observeProduct } = useConnectionManager();
  const { product } = useSelectOrderBookState();

  const toggleFeed = useCallback(() => {
    observeProduct(product === 'Bitcoin' ? 'Ethereum' : 'Bitcoin');
  }, [observeProduct, product]);

  return (
    <div className={styles.toggleFeedContainer}>
      <Button onClick={toggleFeed}>Toggle Feed</Button>
    </div>
  );
};
