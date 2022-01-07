import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { Alert, Backdrop, Snackbar, SnackbarOrigin } from '@mui/material';
import { PartialRecord } from '../../../shared/utils/ts.util';
import { Button } from '../button/button.component';
import styles from './notification.component.module.scss';

type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

interface NotificationAnchor {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

type NotificationBackdropState = 'none' | 'blocking';

const ANCHORS: PartialRecord<NotificationSeverity, NotificationAnchor> = {
  error: {
    vertical: 'top',
    horizontal: 'center',
  },
};

const BACKDROP_STATES: PartialRecord<
  NotificationSeverity,
  NotificationBackdropState
> = {
  error: 'blocking',
};

export interface NotificationProps {
  message: string;
  severity?: NotificationSeverity;
  onActionClick?: () => void;
}

export const Notification: FunctionComponent<NotificationProps> = ({
  message,
  severity = 'info',
  onActionClick,
}) => {
  const anchorOrigin: SnackbarOrigin | undefined = useMemo(
    () => ANCHORS[severity],
    [severity]
  );

  const action: ReactNode = useMemo(() => {
    return onActionClick ? (
      <Button size="small" onClick={onActionClick}>
        Reconnect
      </Button>
    ) : undefined;
  }, [onActionClick]); // TODO: Is useMemo required?

  return (
    <>
      <Snackbar anchorOrigin={anchorOrigin} open>
        <Alert severity={severity} action={action} className={styles.alert}>
          {message}
        </Alert>
      </Snackbar>
      {/* TODO: Check if backdrop blocks events below (e.g. button click) */}
      <Backdrop open={BACKDROP_STATES[severity] === 'blocking'} />
    </>
  );
};
