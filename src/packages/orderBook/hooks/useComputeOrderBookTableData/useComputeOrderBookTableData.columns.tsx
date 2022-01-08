import { ColumnInfo } from '../../../ui/table/table.types';
import { Text } from '../../../ui/text/text.component';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export type OrderBookColumnKey = 'price' | 'size' | 'total';

export const ORDER_BOOK_COLUMNS: Record<OrderBookColumnKey, ColumnInfo> = {
  price: {
    key: 'price',
    title: (
      <Text color="secondary">
        <FormattedMessage id="Price" />
      </Text>
    ),
  },
  size: {
    key: 'size',
    title: (
      <Text color="secondary">
        <FormattedMessage id="Size" />
      </Text>
    ),
  },
  total: {
    key: 'total',
    title: (
      <Text color="secondary">
        <FormattedMessage id="Total" />
      </Text>
    ),
  },
};
