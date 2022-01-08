import React, { FunctionComponent } from 'react';
import { FormattedNumber as ReactIntlFormattedNumber } from 'react-intl';

interface FormattedNumberProps {
  value: number | bigint;
  fractionDigits?: number;
}

export const FormattedNumber: FunctionComponent<FormattedNumberProps> = ({
  value,
  fractionDigits,
}) => {
  return (
    <ReactIntlFormattedNumber
      value={value}
      minimumFractionDigits={fractionDigits}
      maximumFractionDigits={fractionDigits}
    />
  );
};
