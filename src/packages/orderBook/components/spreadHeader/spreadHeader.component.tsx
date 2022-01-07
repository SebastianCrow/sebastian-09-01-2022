import React, { FunctionComponent } from 'react';
import { Text } from '../../../ui/text/text.component';
import { useSelectSpreadInfo } from '../../hooks/useSelectOrderBookState.hook';

export const SpreadHeader: FunctionComponent = () => {
  const spread = useSelectSpreadInfo();
  // TODO: Placeholder for undefined spread
  if (!spread) {
    return null;
  }
  return (
    <Text color="secondary">{`Spread: ${spread.value} (${spread.percent}%)`}</Text>
  );
};
