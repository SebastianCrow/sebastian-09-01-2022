import { ColumnInfo } from '../../../ui/table/table.types';
import { useMemo } from 'react';
import {
  ORDER_BOOK_COLUMNS,
  OrderBookColumnKey,
} from './useComputeOrderBookTableData.columns';
import { Layout } from '../../../../shared/hooks/useLayout.hook';
import { PriceDataType } from '../../state/orderBook.types';

export const useComputeOrderBookTableColumns = ({
  priceDataType,
  layout,
}: {
  priceDataType: PriceDataType;
  layout: Layout;
}): ColumnInfo[] => {
  const bidsInDesktop = useMemo(() => {
    return priceDataType === 'bids' && layout === 'desktop';
  }, [layout, priceDataType]);

  return useMemo(() => {
    const columnsOrder: OrderBookColumnKey[] = (() => {
      if (bidsInDesktop) {
        return ['total', 'size', 'price'];
      }
      return ['price', 'size', 'total'];
    })();
    return columnsOrder.map((key) => ({
      ...ORDER_BOOK_COLUMNS[key],
    }));
  }, [bidsInDesktop]);
};
