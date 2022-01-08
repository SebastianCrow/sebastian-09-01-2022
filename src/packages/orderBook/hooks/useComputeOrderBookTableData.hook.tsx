import React, { useMemo } from 'react';
import { Text, TextColor } from '../../ui/text/text.component';
import { ColumnInfo, RowInfo } from '../../ui/table/table.types';
import { ComputedPriceInfo, PriceDataType } from '../state/orderBook.types';
import { useSelectHighestTotal } from './useSelectOrderBookState.hook';
import { computePercent } from '../../../shared/utils/number.util';
import { useLayout } from '../../../shared/hooks/useLayout.hook';
import { TableProps } from '../../ui/table/table.component';
import styles from './useComputeOrderBookTableData.hook.module.scss';

const HIGHLIGHT_COLORS: Record<PriceDataType, string> = {
  bids: 'rgb(32, 51, 47)', // TODO: Is it a good place for that?
  asks: 'rgb(53, 32, 39)',
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

export const useComputeOrderBookTableData = ({
  priceInfoList,
  priceDataType,
}: {
  priceInfoList: ComputedPriceInfo[] | undefined;
  priceDataType: PriceDataType;
}): TableProps => {
  const layout = useLayout();
  const highestTotal = useSelectHighestTotal(); // TODO: Should it be here?

  const bidsInDesktop = useMemo(() => {
    return priceDataType === 'bids' && layout === 'desktop';
  }, [layout, priceDataType]);

  const bidsInMobile = useMemo(() => {
    return priceDataType === 'bids' && layout === 'mobile';
  }, [layout, priceDataType]);

  const asksInMobile = useMemo(() => {
    return priceDataType === 'asks' && layout === 'mobile';
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
    const convertedPriceInfoList =
      asksInMobile && priceInfoList
        ? [...priceInfoList].reverse() // TODO: Is it the best place?
        : priceInfoList;

    return convertedPriceInfoList?.map(({ price, size, total }, index) => ({
      id: index.toString(), // TODO: Is that required?
      cells: {
        price: {
          value: (
            <Text variant="code" color={computePriceTextColor(priceDataType)}>
              {price.toFixed(2)}
            </Text>
          ),
        },
        size: {
          value: <Text variant="code">{size}</Text>,
        },
        total: {
          value: <Text variant="code">{total}</Text>,
        },
      },
      rowClass: priceDataType === 'bids' ? styles.rowBid : styles.rowAsk,
      rowStyle: highestTotal
        ? {
            // TODO: Explore this method
            backgroundSize: `${computePercent(total, highestTotal)}% 100%`,
            backgroundPositionX: bidsInDesktop ? 'right' : 'left',
            // background: computeBackgroundBar({
            //   direction: bidsInDesktop ? 'left' : 'right',
            //   color: HIGHLIGHT_COLORS[priceDataType],
            //   percent: computePercent(total, highestTotal),
            // }),
          }
        : undefined,
    }));
  }, [asksInMobile, priceInfoList, priceDataType, highestTotal, bidsInDesktop]);

  return useMemo(
    () => ({
      columns,
      data,
      options: bidsInMobile
        ? {
            headerVisible: false,
          }
        : undefined,
    }),
    [bidsInMobile, columns, data]
  );
};
