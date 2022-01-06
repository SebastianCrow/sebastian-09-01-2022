import React, { FunctionComponent } from 'react';
import { Text } from '../../../ui/text/text.component';

const TODO_SPREAD = {
  value: 17.0,
  percent: 0.05,
};

export const SpreadHeader: FunctionComponent = () => {
  return (
    <Text variant="secondary">{`Spread: ${TODO_SPREAD.value} (${TODO_SPREAD.percent}%)`}</Text>
  );
};
