import React, { FunctionComponent, useMemo, useRef, useState } from 'react';
import { Notification } from './notification.component';
import {
  NotificationContext,
  SettableNotificationProps,
} from './useSetNotification.hook';

export const NotificationProvider: FunctionComponent = ({ children }) => {
  const [props, setProps] = useState<SettableNotificationProps>();

  const open = useMemo(() => props !== undefined, [props]);

  // Remember the last defined props to avoid jumping UI during the fade out transition
  const definedProps = useRef<SettableNotificationProps>();
  useMemo(() => {
    if (props) {
      definedProps.current = props;
    }
  }, [props]);

  return (
    <NotificationContext.Provider value={setProps}>
      {definedProps.current && (
        <Notification {...definedProps.current} open={open} />
      )}
      {children}
    </NotificationContext.Provider>
  );
};
