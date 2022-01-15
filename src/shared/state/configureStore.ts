import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { AppState, rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';
import { Store } from '@reduxjs/toolkit';
import { OrderBookActions } from '../../packages/orderBook/state/orderBook.actions';
import { isProduction } from '../utils/env.util';

/**
 * Configure Redux store with Epic and Dev Tools middlewares
 */
export const configureStore = (): Store<AppState> => {
  const epicMiddleware = createEpicMiddleware();

  const storeEnhancer = applyMiddleware(epicMiddleware);

  const store = createStore<AppState, OrderBookActions, unknown, unknown>(
    rootReducer,
    isProduction() ? storeEnhancer : composeWithDevTools(storeEnhancer)
  );
  epicMiddleware.run(rootEpic as Epic);

  return store as unknown as Store<AppState>;
};
