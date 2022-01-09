import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { AppState, rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';
import { Store } from '@reduxjs/toolkit';
import { OrderBookActions } from '../../packages/orderBook/state/orderBook.actions';

export const configureStore = (): Store<AppState> => {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore<AppState, OrderBookActions, unknown, unknown>(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic as Epic);

  return store as unknown as Store<AppState>;
};
