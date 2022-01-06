import { useSelector } from 'react-redux';
import { AppState } from '../../../shared/state/rootReducer';

export const useSelectOrderBookState = () => {
  return useSelector((app: AppState) => app.orderBook);
};
