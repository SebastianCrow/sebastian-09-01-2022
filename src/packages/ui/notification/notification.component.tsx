import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
import { PartialRecord } from '../../../shared/utils/ts.util';
import { Button } from '../button/button.component';
import styles from './notification.component.module.scss';

type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

interface NotificationAnchor {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const ANCHORS: PartialRecord<NotificationSeverity, NotificationAnchor> = {
  error: {
    vertical: 'top',
    horizontal: 'center',
  },
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
    <Snackbar anchorOrigin={anchorOrigin} open={true}>
      <Alert severity={severity} action={action} className={styles.alert}>
        {message}
      </Alert>
    </Snackbar>
  );
};
