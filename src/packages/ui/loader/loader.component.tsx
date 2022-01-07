import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@mui/material';
import styles from './loader.component.module.scss';

export const Loader: FunctionComponent = () => {
  return <CircularProgress className={styles.loader} />;
};
