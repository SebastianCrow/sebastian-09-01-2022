import React, { FunctionComponent } from 'react';
import { Text } from '../../../ui/text/text.component';
import { useSelectSpreadInfo } from '../../hooks/useSelectOrderBookState.hook';
import { FormattedMessage } from 'react-intl';
import { FormattedNumber } from '../../../../translations/components/formattedNumber.component';

export const SpreadHeader: FunctionComponent = () => {
  const spread = useSelectSpreadInfo();
  if (!spread) {
    return null;
  }
  return (
    <Text color="secondary">
      <FormattedMessage
        id="Spread: value (percent%)"
        values={{
          value: <FormattedNumber value={spread.value} fractionDigits={2} />,
          percent: (
            <FormattedNumber value={spread.percent} fractionDigits={2} />
          ),
        }}
      />
    </Text>
  );
};
