import React, { useMemo } from 'react';
import { OrderBook } from './packages/orderBook';
import { configureStore } from './shared/state/configureStore';
import { Provider } from 'react-redux';

function App() {
  const store = useMemo(() => configureStore(), []);
  return (
    <Provider store={store}>
      <OrderBook />
    </Provider>
  );
}

export default App;
