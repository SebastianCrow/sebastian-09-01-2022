import React, { FunctionComponent, MouseEventHandler, useMemo } from 'react';
import cns from 'classnames';
import { Button as MuiButton } from '@mui/material';
import styles from './button.component.module.scss';

const computeMuiVariant = (
  variant: ButtonVariant
): 'contained' | 'text' | 'outlined' => {
  switch (variant) {
    case 'solid':
      return 'contained';
    case 'text':
      return 'text';
    case 'outlined':
      return 'outlined';
  }
};

type ButtonType = 'primary';

type ButtonVariant = 'solid' | 'text' | 'outlined';

type ButtonSize = 'small' | 'medium';

interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FunctionComponent<ButtonProps> = ({
  type = 'primary',
  variant = 'solid',
  size = 'medium',
  onClick,
  children,
}) => {
  const muiVariant = useMemo(() => computeMuiVariant(variant), [variant]);
  return (
    <MuiButton
      variant={muiVariant}
      size={size}
      className={cns({
        [styles.primary]: type === 'primary',
      })}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
