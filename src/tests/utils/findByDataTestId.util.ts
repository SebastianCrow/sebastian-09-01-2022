import { ReactTestInstance } from 'react-test-renderer';

/**
 * Find component by `data-testid` attribute
 * @param instance Root instance
 * @param dataTestId Test id to find
 */
export const findByDataTestId = (
  instance: ReactTestInstance,
  dataTestId: string
): ReactTestInstance => {
  return instance.findByProps({ 'data-testid': dataTestId });
};
