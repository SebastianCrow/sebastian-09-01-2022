import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import styles from './text.component.module.scss';

export type TextVariant = 'primary' | 'secondary' | 'success' | 'danger';

export interface TextProps {
  variant?: TextVariant;
}

export const Text: FunctionComponent<TextProps> = ({
  variant = 'primary',
  children,
}) => {
  return (
    <div
      className={cns({
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
        [styles.success]: variant === 'success',
        [styles.danger]: variant === 'danger',
      })}
    >
      {children}
    </div>
  );
};
