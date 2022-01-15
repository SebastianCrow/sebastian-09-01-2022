import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react';
import { useWindowResize } from './useWindowResize.hook';

const defineWindowSize = (width: number, height: number): void => {
  Object.defineProperty(window, 'innerWidth', {
    get: () => width,
  });
  Object.defineProperty(window, 'innerHeight', {
    get: () => height,
  });
};

describe('useWindowResize.hook', () => {
  test('updates size on `resize` event', () => {
    defineWindowSize(100, 200);

    const { result } = renderHook(() => useWindowResize());

    expect(result.current).toStrictEqual({
      width: 100,
      height: 200,
    });

    defineWindowSize(300, 400);

    act(() => {
      fireEvent.resize(window);
    });

    expect(result.current).toStrictEqual({
      width: 300,
      height: 400,
    });
  });
});
