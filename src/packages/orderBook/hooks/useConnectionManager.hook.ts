import { Product } from '../services/network/orderBookNetwork.types';
import { useStopObservingProductOnDocumentHidden } from './useStopObservingProductOnDocumentHidden.hook';
import { useLostConnectionNotification } from './useLostConnectionNotification.hook';
import { useStartObservingProduct } from './useStartObservingProduct.hook';

export const useConnectionManager = (): {
  observeProduct: (product: Product) => void;
} => {
  const { observeProduct } = useStartObservingProduct();
  useStopObservingProductOnDocumentHidden();
  useLostConnectionNotification(observeProduct);

  return {
    observeProduct,
  };
};
