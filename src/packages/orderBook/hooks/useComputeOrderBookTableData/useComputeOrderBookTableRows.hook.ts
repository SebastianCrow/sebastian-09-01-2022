import { RowInfo } from '../../../ui/table/table.types';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ComputedPriceInfo,
  PriceDataType,
  Total,
} from '../../state/orderBook.types';
import { computeRowInfo } from './useComputeOrderBookTableData.utils';
import { throttle } from 'lodash';
import { Layout } from '../../../../shared/hooks/useLayout.hook';
import { useSelectHighestTotal } from '../useSelectOrderBookState.hook';
import { getFeatureValue } from '../../../../shared/services/featureFlags/featureFlags.service';
import { FeatureValue } from '../../../../shared/services/featureFlags/featureFlags.types';

/**
 * Throttle rendering of the table's data
 */
const RENDER_DATA_THROTTLE_DURATION = parseInt(
  getFeatureValue(FeatureValue.OrderBook_throttle_duration, '150')
);

export const useComputeOrderBookTableRows = ({
  priceInfoList,
  priceDataType,
  layout,
  cellStyle,
}: {
  priceInfoList: ComputedPriceInfo[] | undefined;
  priceDataType: PriceDataType;
  layout: Layout;
  cellStyle: CSSProperties;
}): RowInfo[] | undefined => {
  const [rows, setRows] = useState<RowInfo[]>();

  const selectedHighestTotal = useSelectHighestTotal();

  const bidsInDesktop = useMemo(() => {
    return priceDataType === 'bids' && layout === 'desktop';
  }, [layout, priceDataType]);

  const asksInMobile = useMemo(() => {
    return priceDataType === 'asks' && layout === 'mobile';
  }, [layout, priceDataType]);

  const computeRows = useCallback(
    (
      prices: ComputedPriceInfo[] | undefined,
      highestTotal: Total | undefined
    ) => {
      const convertedPrices =
        asksInMobile && prices ? [...prices].reverse() : prices;

      setRows(
        convertedPrices?.map((priceInfo) =>
          computeRowInfo({
            priceInfo,
            priceDataType,
            highestTotal,
            bidsInDesktop,
            cellStyle,
          })
        )
      );
    },
    [asksInMobile, bidsInDesktop, cellStyle, priceDataType]
  );

  const computeRowsThrottled = useMemo(() => {
    return throttle(computeRows, RENDER_DATA_THROTTLE_DURATION, {
      trailing: false, // fire function only at the beginning of the throttling cycle
    });
  }, [computeRows]);

  useEffect(() => {
    computeRowsThrottled(priceInfoList, selectedHighestTotal);
  }, [computeRowsThrottled, priceInfoList, selectedHighestTotal]);

  return rows;
};
