import React, { FunctionComponent, MouseEventHandler, useMemo } from 'react';
import { Button as MuiButton } from '@mui/material';

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

type ButtonVariant = 'solid' | 'text' | 'outlined';
type ButtonSize = 'small' | 'medium';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FunctionComponent<ButtonProps> = ({
  variant = 'solid',
  size = 'medium',
  onClick,
  children,
}) => {
  const muiVariant = useMemo(() => computeMuiVariant(variant), [variant]);
  return (
    <MuiButton variant={muiVariant} size={size} onClick={onClick}>
      {children}
    </MuiButton>
  );
};
