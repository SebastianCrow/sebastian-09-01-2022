import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react';
import { useDocumentVisibilityState } from './useDocumentVisibilityState.hook';

describe('useDocumentVisibilityState.hook', () => {
  test('updates visibility status on `visibilitychange` event', () => {
    const { result } = renderHook(() => useDocumentVisibilityState());

    expect(result.current).toStrictEqual('visible');

    Object.defineProperty(document, 'visibilityState', {
      get: () => 'hidden',
    });

    act(() => {
      fireEvent(document, new Event('visibilitychange'));
    });

    expect(result.current).toStrictEqual('hidden');
  });
});
