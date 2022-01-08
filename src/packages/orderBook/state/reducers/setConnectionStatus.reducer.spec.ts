import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { SetConnectionStatus } from '../orderBook.actions';
import { orderBookReducer } from './orderBook.reducer';
import { ConnectionStatus } from '../orderBook.types';

describe('setConnectionStatus.reducer', () => {
  const TEST_CASES: [ConnectionStatus, ConnectionStatus][] = [
    ['unsubscribed', 'subscribing'],
    ['subscribing', 'subscribed'],
    ['subscribed', 'unsubscribed'],
    ['unsubscribed', 'error'],
    ['subscribing', 'error'],
    ['subscribed', 'error'],
    ['error', 'unsubscribed'],
    ['error', 'subscribing'],
    ['error', 'subscribed'],
  ];

  test.each(TEST_CASES)(
    'setConnectionStatus',
    (
      inputConnectionStatus: ConnectionStatus,
      outputConnectionStatus: ConnectionStatus
    ) => {
      const input = getOrderBookMockState({
        connectionStatus: inputConnectionStatus,
      });
      const action: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: outputConnectionStatus,
      };
      const output = getOrderBookMockState({
        connectionStatus: outputConnectionStatus,
      });
      expect(orderBookReducer(input, action)).toStrictEqual(output);
    }
  );
});
