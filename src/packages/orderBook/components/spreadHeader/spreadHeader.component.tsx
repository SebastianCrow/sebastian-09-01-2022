import React, { FunctionComponent } from 'react';

const TODO_SPREAD = {
  value: 17.0,
  percent: 0.05,
};

export const SpreadHeader: FunctionComponent = () => {
  return (
    <div
      style={{ backgroundColor: 'blue' }}
    >{`Spread: ${TODO_SPREAD.value} (${TODO_SPREAD.percent}%)`}</div>
  );
};
