import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import styles from './text.component.module.scss';

interface TextProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
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
