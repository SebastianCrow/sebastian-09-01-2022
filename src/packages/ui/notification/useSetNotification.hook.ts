import { createContext, useContext } from 'react';
import { NotificationProps } from './notification.component';

export type SettableNotificationProps = Omit<NotificationProps, 'open'>;

type SetNotificationProps = (
  props: SettableNotificationProps | undefined
) => void;

export const NotificationContext = createContext<SetNotificationProps>(() => {
  throw new Error('NotificationContext is not defined');
});

export const useSetNotification = (): SetNotificationProps => {
  return useContext(NotificationContext);
};
