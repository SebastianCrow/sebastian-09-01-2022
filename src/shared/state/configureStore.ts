import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { AppState, rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';
import { Store } from '@reduxjs/toolkit';

export const configureStore = (): Store<AppState> => {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore<AppState, any, unknown, unknown>( // TODO: any
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  return store;
};
