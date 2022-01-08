import React, { FunctionComponent, useCallback } from 'react';
import styles from './orderBookFooter.component.module.scss';
import { Button } from '../../../ui/button/button.component';
import { useSelectOrderBookState } from '../../hooks/useSelectOrderBookState.hook';
import { Product } from '../../services/network/orderBookNetwork.types';
import { FormattedMessage } from 'react-intl';

interface OrderBookFooterProps {
  observeProduct: (product: Product) => void;
}

export const OrderBookFooter: FunctionComponent<OrderBookFooterProps> = ({
  observeProduct,
}) => {
  const { product, connectionStatus } = useSelectOrderBookState();

  const toggleFeed = useCallback(() => {
    observeProduct(
      product === Product.Bitcoin_USD
        ? Product.Ethereum_USD
        : Product.Bitcoin_USD
    );
  }, [observeProduct, product]);

  return (
    <div className={styles.toggleFeedContainer}>
      <Button
        onClick={toggleFeed}
        disabled={connectionStatus === 'error'}
        data-testid="toggle-feed-button"
      >
        <FormattedMessage id="Toggle Feed" />
      </Button>
    </div>
  );
};
