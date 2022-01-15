import { Product } from '../services/network/orderBookNetwork.types';
import { useStopObservingProductOnDocumentHidden } from './useStopObservingProductOnDocumentHidden.hook';
import { useLostConnectionNotification } from './useLostConnectionNotification.hook';
import { useStartObservingProduct } from './useStartObservingProduct.hook';

/**
 * Hook managing the network connection:
 * 1. Establishing the connection
 * 2. Stop listening when the document is hidden
 * 3. Displaying the warning in UI about lost connection with the reconnect button
 */
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
