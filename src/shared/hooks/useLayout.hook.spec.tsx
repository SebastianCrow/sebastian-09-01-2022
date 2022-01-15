import { renderHook } from '@testing-library/react-hooks';
import { useLayout } from './useLayout.hook';
import * as useWindowResizeHook from './useWindowResize.hook';

describe('useLayout.hook', () => {
  test('updates layout on window resize', () => {
    jest
      .spyOn(useWindowResizeHook, 'useWindowResize')
      .mockImplementation(() => ({
        width: 768,
        height: 1000,
      }));

    const { result, rerender } = renderHook(() => useLayout());

    expect(result.current).toStrictEqual('desktop');

    jest
      .spyOn(useWindowResizeHook, 'useWindowResize')
      .mockImplementation(() => ({
        width: 767,
        height: 1000,
      }));

    rerender();

    expect(result.current).toStrictEqual('mobile');
  });
});
