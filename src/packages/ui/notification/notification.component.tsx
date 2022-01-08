import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { Alert, Backdrop, Snackbar, SnackbarOrigin } from '@mui/material';
import { PartialRecord } from '../../../shared/utils/ts.util';
import { Button } from '../button/button.component';
import styles from './notification.component.module.scss';
import { FormattedMessage } from 'react-intl';

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

type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

interface NotificationAnchor {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

type NotificationBackdropState = 'none' | 'blocking';

export interface NotificationProps {
  open: boolean;
  message: string;
  severity?: NotificationSeverity;
  action?: {
    title: string;
    onClick: () => void;
  };
}

export const Notification: FunctionComponent<NotificationProps> = ({
  open,
  message,
  severity = 'info',
  action,
}) => {
  const anchorOrigin: SnackbarOrigin | undefined = useMemo(
    () => ANCHORS[severity],
    [severity]
  );

  const actionComponent: ReactNode = useMemo(() => {
    return action ? (
      <Button size="small" onClick={action.onClick}>
        <FormattedMessage id={action.title} />
      </Button>
    ) : undefined;
  }, [action]);

  return (
    <>
      <Snackbar anchorOrigin={anchorOrigin} open={open}>
        <Alert
          severity={severity}
          action={actionComponent}
          className={styles.alert}
        >
          <FormattedMessage id={message} />
        </Alert>
      </Snackbar>
      <Backdrop
        open={open && BACKDROP_STATES[severity] === 'blocking'}
        className={styles.backdrop}
      />
    </>
  );
};
