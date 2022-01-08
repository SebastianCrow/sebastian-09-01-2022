import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import styles from './text.component.module.scss';

export type TextVariant = 'regular' | 'title' | 'code';

export type TextColor = 'primary' | 'secondary' | 'success' | 'danger';

export interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
}

export const Text: FunctionComponent<TextProps> = ({
  variant,
  color = 'primary',
  children,
}) => {
  return (
    <div
      className={cns({
        [styles.title]: variant === 'title',
        [styles.code]: variant === 'code',
        [styles.primary]: color === 'primary',
        [styles.secondary]: color === 'secondary',
        [styles.success]: color === 'success',
        [styles.danger]: color === 'danger',
      })}
    >
      {children}
    </div>
  );
};
