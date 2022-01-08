import { ReactTestInstance } from 'react-test-renderer';

export const findByDataTestId = (
  instance: ReactTestInstance,
  dataTestId: string
): ReactTestInstance => {
  return instance.findByProps({ 'data-testid': dataTestId });
};
