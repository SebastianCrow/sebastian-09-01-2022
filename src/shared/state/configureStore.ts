import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './rootReducer';

export const configureStore = (): ReturnType<typeof createStore> => {
  const epicMiddleware = createEpicMiddleware();
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
};
