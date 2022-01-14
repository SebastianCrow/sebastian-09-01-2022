import { useMemo } from 'react';
import { TableInfo } from '../../ui/table/table.types';
import { PriceDataType } from '../state/orderBook.types';
import { Layout } from '../../../shared/hooks/useLayout.hook';

export const useComputeOrderBookTableOptions = ({
  priceDataType,
  layout,
}: {
  priceDataType: PriceDataType;
  layout: Layout;
}): TableInfo => {
  const bidsInMobile = useMemo(() => {
    return priceDataType === 'bids' && layout === 'mobile';
  }, [layout, priceDataType]);

  return useMemo(() => {
    return bidsInMobile
      ? {
          headerVisible: false,
        }
      : {};
  }, [bidsInMobile]);
};
