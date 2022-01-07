import React, { FunctionComponent, MouseEventHandler, useMemo } from 'react';
import { Button as MuiButton } from '@mui/material';

const computeMuiVariant = (variant: ButtonVariant): 'contained' => {
  switch (variant) {
    case 'solid':
      return 'contained';
  }
};

type ButtonVariant = 'solid';

interface ButtonProps {
  variant?: 'solid';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FunctionComponent<ButtonProps> = ({
  variant = 'solid',
  onClick,
  children,
}) => {
  const muiVariant = useMemo(() => computeMuiVariant(variant), [variant]);
  return (
    <MuiButton variant={muiVariant} onClick={onClick}>
      {children}
    </MuiButton>
  );
};
