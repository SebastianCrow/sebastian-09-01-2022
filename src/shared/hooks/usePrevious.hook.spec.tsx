import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious.hook';

describe('usePrevious.hook', () => {
  test('stores previous value', () => {
    const { result, rerender } = renderHook((value: number) =>
      usePrevious(value)
    );

    rerender(1);
    expect(result.current).toStrictEqual(undefined);
    rerender(2);
    expect(result.current).toStrictEqual(1);
    rerender(3);
    expect(result.current).toStrictEqual(2);
  });
});
