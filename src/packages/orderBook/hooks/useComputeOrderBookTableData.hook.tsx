import React, { useMemo } from 'react';
import { Text, TextColor } from '../../ui/text/text.component';
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
    title: <Text color="secondary">Price</Text>,
  },
  size: {
    key: 'size',
    title: <Text color="secondary">Size</Text>,
  },
  total: {
    key: 'total',
    title: <Text color="secondary">Total</Text>,
  },
};

const computePriceTextColor = (priceDataType: PriceDataType): TextColor => {
  switch (priceDataType) {
    case 'bids':
      return 'success';
    case 'asks':
      return 'danger';
  }
};

const computeBackgroundBar = ({
  direction,
  color,
  percent,
}: {
  direction: 'left' | 'right';
  color: string; // TODO: Is there any type for CSS color?
  percent: number; // 0 - 100
}): string => {
  return `linear-gradient(${
    direction === 'left' ? 'to left' : 'to right'
  }, ${color} 0 ${percent}%, transparent ${percent}% 100%)`;
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
            <Text color={computePriceTextColor(priceDataType)}>{price}</Text>
          ),
        },
        size: {
          value: <Text>{size}</Text>,
        },
        total: {
          value: <Text>{total}</Text>,
        },
      },
      rowStyle: highestTotal
        ? {
            // TODO: Explore this method
            // backgroundSize: `${highlight.percent}% 100%`,
            // backgroundPositionX:
            //   highlight.direction === 'left' ? 'right' : 'left',
            background: computeBackgroundBar({
              direction: bidsInDesktop ? 'left' : 'right',
              color: HIGHLIGHT_COLORS[priceDataType],
              percent: computePercent(total, highestTotal),
            }),
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
