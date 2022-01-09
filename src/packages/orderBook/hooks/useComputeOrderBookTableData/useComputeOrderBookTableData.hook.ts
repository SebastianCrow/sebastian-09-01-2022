import { CSSProperties, useMemo } from 'react';
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
import styles from './useComputeOrderBookTableData.hook.module.scss';

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

  const cellStyle: CSSProperties = useMemo(
    () => ({
      width: `${100 / Object.keys(ORDER_BOOK_COLUMNS).length}%`,
    }),
    []
  );

  const columns: ColumnInfo[] = useMemo(() => {
    const columnsOrder: OrderBookColumnKey[] = (() => {
      if (bidsInDesktop) {
        return ['total', 'size', 'price'];
      }
      return ['price', 'size', 'total'];
    })();
    return columnsOrder.map((key) => ({
      ...ORDER_BOOK_COLUMNS[key],
      cellStyle,
    }));
  }, [bidsInDesktop, cellStyle]);

  const data: RowInfo[] | undefined = useMemo(() => {
    const convertedPriceInfoList =
      asksInMobile && priceInfoList
        ? [...priceInfoList].reverse()
        : priceInfoList;

    return convertedPriceInfoList?.map((priceInfo) =>
      computeRowInfo({
        priceInfo,
        priceDataType,
        highestTotal,
        bidsInDesktop,
        cellStyle,
      })
    );
  }, [
    asksInMobile,
    priceInfoList,
    priceDataType,
    highestTotal,
    bidsInDesktop,
    cellStyle,
  ]);

  return useMemo(
    () => ({
      columns,
      data,
      options: bidsInMobile
        ? {
            headerVisible: false,
            tableClass: styles.table,
          }
        : {
            tableClass: styles.table,
          },
    }),
    [bidsInMobile, columns, data]
  );
};
