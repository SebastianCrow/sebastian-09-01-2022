import React, { useMemo } from 'react';
import { Text, TextVariant } from '../../ui/text/text.component';
import { ColumnInfo, RowInfo } from '../../ui/table/table.types';
import { ComputedPriceInfo, PriceDataType } from '../state/orderBook.types';
import { last } from 'lodash';
import { useSelectHighestTotal } from './useSelectOrderBookState.hook';
import { computePercent } from '../../../shared/utils/number.util';

const COLUMNS: ColumnInfo[] = [
  {
    key: 'price',
    title: <Text variant="secondary">Price</Text>,
  },
  {
    key: 'size',
    title: <Text variant="secondary">Size</Text>,
  },
  {
    key: 'total',
    title: <Text variant="secondary">Total</Text>,
  },
];

const computePriceTextVariant = (priceDataType: PriceDataType): TextVariant => {
  switch (priceDataType) {
    case 'bids':
      return 'success';
    case 'asks':
      return 'danger';
  }
};

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
  const highestTotal = useSelectHighestTotal(); // TODO: Should it be here?
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
            direction: 'left',
            color: 'rgba(0, 255, 0, 0.2)',
            percent: computePercent(total, highestTotal),
          }
        : undefined,
    }));
  }, [priceInfoList, priceDataType, highestTotal]);

  return useMemo(
    () => ({
      columns: COLUMNS,
      data,
    }),
    [data]
  );
};
