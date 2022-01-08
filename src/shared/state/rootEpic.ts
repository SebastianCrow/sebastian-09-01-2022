import { combineEpics } from 'redux-observable';
import { orderBookEpics } from '../../packages/orderBook/state/epics/orderBook.epic';

export const rootEpic = combineEpics<any, any, any>(orderBookEpics); // TODO: Fix casting
