import { useMemo } from 'react';
import { ComputedPriceInfo, PriceDataType } from '../../state/orderBook.types';
import { useLayout } from '../../../../shared/hooks/useLayout.hook';
import { TableProps } from '../../../ui/table/table.component';
import { useComputeOrderBookTableColumns } from './useComputeOrderBookTableColumns.hook';
import { useComputeOrderBookTableRows } from './useComputeOrderBookTableRows.hook';
import { useComputeOrderBookTableOptions } from './useComputeOrderBookTableOptions.hook';

export const useComputeOrderBookTableData = ({
  priceInfoList,
  priceDataType,
}: {
  priceInfoList: ComputedPriceInfo[];
  priceDataType: PriceDataType;
}): TableProps => {
  const layout = useLayout();

  const columns = useComputeOrderBookTableColumns({
    priceDataType,
    layout,
  });

  const data = useComputeOrderBookTableRows({
    priceInfoList,
    priceDataType,
    layout,
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
