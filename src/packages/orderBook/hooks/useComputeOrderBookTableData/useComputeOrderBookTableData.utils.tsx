import {
  ComputedPriceInfo,
  PriceDataType,
  Total,
} from '../../state/orderBook.types';
import { Text, TextColor } from '../../../ui/text/text.component';
import { RowInfo } from '../../../ui/table/table.types';
import { FormattedNumber } from '../../../../translations/components/formattedNumber.component';
import React from 'react';
import { isFeatureFlagEnabled } from '../../../../shared/services/featureFlags/featureFlags.service';
import { FeatureFlag } from '../../../../shared/services/featureFlags/featureFlags.types';
import { computeHighlightBarBackgroundBar } from '../../services/computeHighlightBarLinearGradient';
import { computePercent } from '../../../../shared/utils/number.util';
import styles from './useComputeOrderBookTableData.hook.module.scss';

const linearGradientFeatureEnabled = isFeatureFlagEnabled(
  FeatureFlag.OrderBook_highlightBars_linearGradient
);

export const computeRowInfo = ({
  priceInfo: { price, size, total },
  priceDataType,
  highestTotal,
  bidsInDesktop,
}: {
  priceInfo: ComputedPriceInfo;
  priceDataType: PriceDataType;
  highestTotal: Total | undefined;
  bidsInDesktop: boolean;
}): RowInfo => {
  return {
    id: price.toString(),
    cells: {
      price: {
        value: (
          <Text variant="code" color={computePriceTextColor(priceDataType)}>
            <FormattedNumber value={price} fractionDigits={2} />
          </Text>
        ),
      },
      size: {
        value: (
          <Text variant="code">
            <FormattedNumber value={size} />
          </Text>
        ),
      },
      total: {
        value: (
          <Text variant="code">
            <FormattedNumber value={total} />
          </Text>
        ),
      },
    },
    ...(linearGradientFeatureEnabled
      ? getLinearGradientRowOptions({
          total,
          highestTotal,
          priceDataType,
          bidsInDesktop,
        })
      : getBackgroundImageRowOptions({
          total,
          highestTotal,
          priceDataType,
          bidsInDesktop,
        })),
  };
};

const computePriceTextColor = (priceDataType: PriceDataType): TextColor => {
  switch (priceDataType) {
    case 'bids':
      return 'success';
    case 'asks':
      return 'danger';
  }
};

const getLinearGradientRowOptions = ({
  total,
  highestTotal,
  priceDataType,
  bidsInDesktop,
}: {
  total: Total;
  highestTotal: Total | undefined;
  priceDataType: PriceDataType;
  bidsInDesktop: boolean;
}) => ({
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

const getBackgroundImageRowOptions = ({
  total,
  highestTotal,
  priceDataType,
  bidsInDesktop,
}: {
  total: Total;
  highestTotal: Total | undefined;
  priceDataType: PriceDataType;
  bidsInDesktop: boolean;
}) => ({
  rowClass: priceDataType === 'bids' ? styles.rowBid : styles.rowAsk,
  rowStyle: highestTotal
    ? {
        backgroundSize: `${computePercent(total, highestTotal)}% 100%`,
        backgroundPositionX: bidsInDesktop ? 'right' : 'left',
      }
    : undefined,
});
