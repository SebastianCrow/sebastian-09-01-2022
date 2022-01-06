import { combineEpics } from 'redux-observable';
import { orderBookEpics } from '../../packages/orderBook/state/orderBook.epic';

export const rootEpic = combineEpics<any>(orderBookEpics); // TODO: Fix casting
