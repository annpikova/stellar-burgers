import { expect, test, describe } from '@jest/globals';
import feedsReducer, {
  fetchFeeds,
  initialState
} from '../services/slices/feedsSlice';

describe('feedsSlice reducer', () => {
  const actions = {
    pending: {
      type: fetchFeeds.pending.type
    },
    fulfilled: {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: ['order1', 'order2', 'order3'],
        total: 3,
        totalToday: 1
      }
    },
    rejected: {
      type: fetchFeeds.rejected.type
    }
  };

  it('обрабатывает fetchFeeds.pending', () => {
    const state = feedsReducer(initialState, actions.pending);
    expect(state.isFeedsLoading).toBe(true);
  });

  it('обрабатывает fetchFeeds.fulfilled', () => {
    const state = feedsReducer(initialState, actions.fulfilled);
    expect(state.isFeedsLoading).toBe(false);
    expect(state.orders).toEqual(actions.fulfilled.payload.orders);
    expect(state.total).toBe(actions.fulfilled.payload.total);
    expect(state.totalToday).toBe(actions.fulfilled.payload.totalToday);
  });

  it('обрабатывает fetchFeeds.rejected', () => {
    const state = feedsReducer(initialState, actions.rejected);
    expect(state.isFeedsLoading).toBe(false);
  });
});
