import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import styles from './text.component.module.scss';

interface TextProps {
  variant?: 'primary' | 'secondary';
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
      })}
    >
      {children}
    </div>
  );
};
