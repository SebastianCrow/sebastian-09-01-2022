import { useMemo } from 'react';
import { ColumnInfo, RowInfo } from '../../../ui/table/table.types';
import { ComputedPriceInfo, PriceDataType } from '../../state/orderBook.types';
import { useSelectHighestTotal } from '../useSelectOrderBookState.hook';
import { useLayout } from '../../../../shared/hooks/useLayout.hook';
import { TableProps } from '../../../ui/table/table.component';
import {
  ORDER_BOOK_COLUMNS,
  OrderBookColumnKey,
} from './useComputeOrderBookTableData.columns';
import { computeRowInfo } from './useComputeOrderBookTableData.utils';

export const useComputeOrderBookTableData = ({
  priceInfoList,
  priceDataType,
}: {
  priceInfoList: ComputedPriceInfo[] | undefined;
  priceDataType: PriceDataType;
}): TableProps => {
  const layout = useLayout();
  const highestTotal = useSelectHighestTotal();

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
    const columnsOrder: OrderBookColumnKey[] = (() => {
      if (bidsInDesktop) {
        return ['total', 'size', 'price'];
      }
      return ['price', 'size', 'total'];
    })();
    return columnsOrder.map((key) => ORDER_BOOK_COLUMNS[key]);
  }, [bidsInDesktop]);

  const data: RowInfo[] | undefined = useMemo(() => {
    const convertedPriceInfoList =
      asksInMobile && priceInfoList
        ? [...priceInfoList].reverse() // TODO: Is it the best place?
        : priceInfoList;

    return convertedPriceInfoList?.map((priceInfo) =>
      computeRowInfo({
        priceInfo,
        priceDataType,
        highestTotal,
        bidsInDesktop,
      })
    );
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
