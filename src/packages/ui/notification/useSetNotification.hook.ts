import { createContext, useContext } from 'react';
import { NotificationProps } from './notification.component';

type SetNotificationProps = (props: NotificationProps | undefined) => void;

export const NotificationContext = createContext<SetNotificationProps>(() => {
  throw new Error('NotificationContext is not defined');
});

export const useSetNotification = (): SetNotificationProps => {
  return useContext(NotificationContext);
};
