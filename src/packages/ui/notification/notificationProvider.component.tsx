import React, { FunctionComponent, useState } from 'react';
import { Notification, NotificationProps } from './notification.component';
import { NotificationContext } from './useSetNotification.hook';

export const NotificationProvider: FunctionComponent = ({ children }) => {
  const [props, setProps] = useState<NotificationProps>();
  return (
    <NotificationContext.Provider value={setProps}>
      {props && <Notification {...props} />}
      {children}
    </NotificationContext.Provider>
  );
};
