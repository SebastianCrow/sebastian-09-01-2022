import React, { useMemo } from 'react';
import { Text, TextColor } from '../../ui/text/text.component';
import { ColumnInfo, RowInfo } from '../../ui/table/table.types';
import {
  ComputedPriceInfo,
  PriceDataType,
  Total,
} from '../state/orderBook.types';
import { useSelectHighestTotal } from './useSelectOrderBookState.hook';
import { computePercent } from '../../../shared/utils/number.util';
import { useLayout } from '../../../shared/hooks/useLayout.hook';
import { TableProps } from '../../ui/table/table.component';
import styles from './useComputeOrderBookTableData.hook.module.scss';
import { isFeatureFlagEnabled } from '../../../shared/services/featureFlags/featureFlags.service';
import { FeatureFlag } from '../../../shared/services/featureFlags/featureFlags.types';
import { computeHighlightBarBackgroundBar } from '../services/computeHighlightBarLinearGradient';

const linearGradientFeatureEnabled = isFeatureFlagEnabled(
  FeatureFlag.OrderBook_highlightBars_linearGradient
);

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

    const getLinearGradientRowOptions = (total: Total) => ({
      rowStyle: highestTotal
        ? {
            background: computeHighlightBarBackgroundBar({
              direction: bidsInDesktop ? 'left' : 'right',
              percent: computePercent(total, highestTotal),
              priceDataType,
            }),
          }
        : undefined,
    });

    const getBackgroundImageRowOptions = (total: Total) => ({
      rowClass: priceDataType === 'bids' ? styles.rowBid : styles.rowAsk,
      rowStyle: highestTotal
        ? {
            backgroundSize: `${computePercent(total, highestTotal)}% 100%`,
            backgroundPositionX: bidsInDesktop ? 'right' : 'left',
          }
        : undefined,
    });

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
      ...(linearGradientFeatureEnabled
        ? getLinearGradientRowOptions(total)
        : getBackgroundImageRowOptions(total)),
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
