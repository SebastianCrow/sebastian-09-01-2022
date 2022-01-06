import React, { useMemo } from 'react';
import { Text, TextVariant } from '../../ui/text/text.component';
import { ColumnInfo, RowInfo } from '../../ui/table/table.types';
import { ComputedPriceInfo, PriceDataType } from '../state/orderBook.types';

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
    }));
  }, [priceInfoList, priceDataType]);

  return useMemo(
    () => ({
      columns: COLUMNS,
      data,
    }),
    [data]
  );
};
