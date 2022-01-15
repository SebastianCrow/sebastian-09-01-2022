import { renderHook } from '@testing-library/react-hooks';
import { AppProviders } from '../../app/components/appProviders.component';
import * as useSetNotificationHook from '../../ui/notification/useSetNotification.hook';
import { getOrderBookMockStore } from '../../../tests/mocks/getOrderBookMockStore';
import { useLostConnectionNotification } from './useLostConnectionNotification.hook';
import { noop } from 'lodash';
import { SettableNotificationProps } from '../../ui/notification/useSetNotification.hook';
import { ConnectionStatus } from '../state/orderBook.types';

describe('useLostConnectionNotification.hook', () => {
  let useSetNotificationMock: jest.Mock;
  beforeEach(() => {
    useSetNotificationMock = jest.fn();
    jest
      .spyOn(useSetNotificationHook, 'useSetNotification')
      .mockImplementation(() => useSetNotificationMock);
  });

  const FAULTY_STATUSES: ConnectionStatus[][] = [['unsubscribed'], ['error']];
  test.each(FAULTY_STATUSES)(
    'displays a notification on `%s` connection status',
    (connectionStatus: ConnectionStatus) => {
      const { rerender } = renderHook(
        () => useLostConnectionNotification(noop),
        {
          wrapper: AppProviders,
        }
      );

      expect(useSetNotificationMock).toHaveBeenCalledTimes(1);
      expect(useSetNotificationMock).toHaveBeenCalledWith(undefined);

      rerender({
        store: getOrderBookMockStore({
          connectionStatus,
        }),
      });

      const notificationProps: SettableNotificationProps = {
        message: 'Ups... connection is not established. Sorry.',
        severity: 'error',
        action: {
          title: 'Reconnect',
          onClick: expect.any(Function),
        },
      };

      expect(useSetNotificationMock).toHaveBeenCalledTimes(2);
      expect(useSetNotificationMock.mock.calls).toEqual([
        [undefined],
        [notificationProps],
      ]);
    }
  );

  const CORRECT_STATUSES: ConnectionStatus[][] = [['subscribed']];
  test.each(CORRECT_STATUSES)(
    'hides a notification on `%s` connection status',
    (connectionStatus: ConnectionStatus) => {
      const { rerender } = renderHook(
        () => useLostConnectionNotification(noop),
        {
          wrapper: AppProviders,
        }
      );

      expect(useSetNotificationMock).toHaveBeenCalledTimes(1);

      rerender({
        store: getOrderBookMockStore({
          connectionStatus,
        }),
      });

      expect(useSetNotificationMock).toHaveBeenCalledTimes(2);
      expect(useSetNotificationMock.mock.calls).toEqual([
        [undefined],
        [undefined],
      ]);
    }
  );

  test('does not trigger a notification on the same connection status', () => {
    const { rerender } = renderHook(() => useLostConnectionNotification(noop), {
      wrapper: AppProviders,
    });

    expect(useSetNotificationMock).toHaveBeenCalledTimes(1);

    rerender({
      store: getOrderBookMockStore({
        connectionStatus: 'subscribing',
      }),
    });

    expect(useSetNotificationMock).toHaveBeenCalledTimes(1);
    expect(useSetNotificationMock).toHaveBeenCalledWith(undefined);
  });
});
