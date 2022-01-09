import React, { FunctionComponent } from 'react';
import { FormattedNumber as ReactIntlFormattedNumber } from 'react-intl';

interface FormattedNumberProps {
  value: number | bigint;
  fractionDigits?: number;
}

/**
 * Format number to the current locale optionally speicifying an exact number of fraction digits
 * @param value Value to format
 * @param fractionDigits Fraction digits
 * @constructor
 */
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
