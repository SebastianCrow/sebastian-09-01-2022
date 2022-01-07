import React, { FunctionComponent, useMemo, useRef, useState } from 'react';
import { Notification } from './notification.component';
import {
  NotificationContext,
  SettableNotificationProps,
} from './useSetNotification.hook';

export const NotificationProvider: FunctionComponent = ({ children }) => {
  const [props, setProps] = useState<SettableNotificationProps>();

  const definedProps = useRef<SettableNotificationProps>();
  useMemo(() => {
    if (props) {
      definedProps.current = props;
    }
  }, [props]);

  const open = useMemo(() => props !== undefined, [props]);

  return (
    <NotificationContext.Provider value={setProps}>
      {definedProps.current && (
        <Notification open={open} {...definedProps.current} />
      )}
      {children}
    </NotificationContext.Provider>
  );
};
