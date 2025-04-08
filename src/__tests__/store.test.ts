import { expect } from '@jest/globals';
import store, { rootReducer } from '../services/store';

describe('Тестирование rootReducer', () => {
  it('должен возвращать начальное состояние, равное store.getState()', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const rootState = rootReducer(undefined, unknownAction);

    expect(rootState).toEqual(store.getState());
  });
});
