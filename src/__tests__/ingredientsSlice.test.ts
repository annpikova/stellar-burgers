import { expect, test, describe } from '@jest/globals';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../services/slices/ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  const actions = {
    pending: {
      type: fetchIngredients.pending.type
    },
    fulfilled: {
      type: fetchIngredients.fulfilled.type,
      payload: ['ingredient1', 'ingredient2', 'ingredient3']
    },
    rejected: {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    }
  };

  it('должен обрабатывать fetchIngredients.pending', () => {
    const state = ingredientsReducer(initialState, actions.pending);
    expect(state.errorMessage).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it('должен обрабатывать fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(initialState, actions.fulfilled);
    expect(state.isLoading).toBe(false);
    expect(state.ingredientsData).toEqual(actions.fulfilled.payload);
  });

  it('должен обрабатывать fetchIngredients.rejected', () => {
    const state = ingredientsReducer(initialState, actions.rejected);
    expect(state.errorMessage).toBe(actions.rejected.error.message);
    expect(state.isLoading).toBe(false);
  });
});
