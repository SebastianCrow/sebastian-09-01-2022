import { combineEpics } from 'redux-observable';
import { orderBookEpics } from '../../packages/orderBook/state/epics/orderBook.epic';

export const rootEpic = combineEpics(orderBookEpics);
