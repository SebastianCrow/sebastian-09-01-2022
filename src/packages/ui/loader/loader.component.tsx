import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@mui/material';
import styles from './loader.component.module.scss';

export const Loader: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <CircularProgress className={styles.loader} />
    </div>
  );
};
