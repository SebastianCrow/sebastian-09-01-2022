import React, { useMemo } from 'react';
import { Text, TextVariant } from '../../ui/text/text.component';
import { ColumnInfo, RowInfo } from '../../ui/table/table.types';
import { ComputedPriceInfo, PriceDataType } from '../state/orderBook.types';
import { useSelectHighestTotal } from './useSelectOrderBookState.hook';
import { computePercent } from '../../../shared/utils/number.util';
import { useLayout } from '../../../shared/hooks/useLayout.hook';

const HIGHLIGHT_COLORS: Record<PriceDataType, string> = {
  bids: 'rgba(0, 255, 0, 0.2)',
  asks: 'rgba(255, 0, 0, 0.2)',
};

const COLUMNS: Record<ColumnKey, ColumnInfo> = {
  price: {
    key: 'price',
    title: <Text variant="secondary">Price</Text>,
  },
  size: {
    key: 'size',
    title: <Text variant="secondary">Size</Text>,
  },
  total: {
    key: 'total',
    title: <Text variant="secondary">Total</Text>,
  },
};

const computePriceTextVariant = (priceDataType: PriceDataType): TextVariant => {
  switch (priceDataType) {
    case 'bids':
      return 'success';
    case 'asks':
      return 'danger';
  }
};

type ColumnKey = 'price' | 'size' | 'total';

interface TableData {
  columns: ColumnInfo[];
  data: RowInfo[] | undefined;
}

export const useComputeOrderBookTableData = ({
  priceInfoList,
  priceDataType,
}: {
  priceInfoList: ComputedPriceInfo[] | undefined;
  priceDataType: PriceDataType;
}): TableData => {
  const layout = useLayout();
  const highestTotal = useSelectHighestTotal(); // TODO: Should it be here?

  const bidsInDesktop = useMemo(() => {
    return priceDataType === 'bids' && layout === 'desktop';
  }, [layout, priceDataType]);

  const columns: ColumnInfo[] = useMemo(() => {
    const columnsOrder: ColumnKey[] = (() => {
      if (bidsInDesktop) {
        return ['total', 'size', 'price'];
      }
      return ['price', 'size', 'total'];
    })();
    return columnsOrder.map((key) => COLUMNS[key]);
  }, [bidsInDesktop]);

  const data: RowInfo[] | undefined = useMemo(() => {
    return priceInfoList?.map(({ price, size, total }, index) => ({
      id: index.toString(), // TODO: Is that required?
      cells: {
        price: {
          value: (
            <Text variant={computePriceTextVariant(priceDataType)}>
              {price}
            </Text>
          ),
        },
        size: {
          value: <Text>{size}</Text>,
        },
        total: {
          value: <Text>{total}</Text>,
        },
      },
      highlight: highestTotal
        ? {
            direction: bidsInDesktop ? 'left' : 'right',
            color: HIGHLIGHT_COLORS[priceDataType],
            percent: computePercent(total, highestTotal),
          }
        : undefined,
    }));
  }, [priceInfoList, priceDataType, highestTotal, bidsInDesktop]);

  return useMemo(
    () => ({
      columns,
      data,
    }),
    [columns, data]
  );
};
