import { CSSProperties, useMemo } from 'react';
import { ComputedPriceInfo, PriceDataType } from '../../state/orderBook.types';
import { useLayout } from '../../../../shared/hooks/useLayout.hook';
import { TableProps } from '../../../ui/table/table.component';
import { ORDER_BOOK_COLUMNS } from './useComputeOrderBookTableData.columns';
import { useComputeOrderBookTableColumns } from './useComputeOrderBookTableColumns.hook';
import { useComputeOrderBookTableRows } from './useComputeOrderBookTableRows.hook';
import { useComputeOrderBookTableOptions } from '../useComputeOrderBookTableOptions.hook';

export const useComputeOrderBookTableData = ({
  priceInfoList,
  priceDataType,
}: {
  priceInfoList: ComputedPriceInfo[] | undefined;
  priceDataType: PriceDataType;
}): TableProps => {
  const layout = useLayout();

  // Make sure that cells are always of the same width to avoid jumping UI
  const cellStyle: CSSProperties = useMemo(
    () => ({
      width: `${100 / Object.keys(ORDER_BOOK_COLUMNS).length}%`,
    }),
    []
  );

  const columns = useComputeOrderBookTableColumns({
    priceDataType,
    layout,
    cellStyle,
  });

  const data = useComputeOrderBookTableRows({
    priceInfoList,
    priceDataType,
    layout,
    cellStyle,
  });

  const options = useComputeOrderBookTableOptions({
    priceDataType,
    layout,
  });

  return useMemo(
    () => ({
      columns,
      data,
      options,
    }),
    [columns, data, options]
  );
};
