import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

/**
 * Тип состояния для ингредиентов.
 */
export type TIngredientsState = {
  ingredientsData: TIngredient[];
  isIngredientsLoading: boolean;
};

/**
 * Начальное состояние ингредиентов.
 */
export const initialState: TIngredientsState = {
  ingredientsData: [],
  isIngredientsLoading: false
};

/**
 * Асинхронный thunk для получения списка ингредиентов с сервера.
 */
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

/**
 * Срез состояния для управления ингредиентами.
 */
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsData = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
