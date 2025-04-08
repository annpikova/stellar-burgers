import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

/**
 * Тип состояния для ингредиентов.
 */
export type TIngredientsState = {
  ingredientsData: TIngredient[];
  isLoading: boolean;
  errorMessage: string | null;
};

/**
 * Начальное состояние ингредиентов.
 */
export const initialState: TIngredientsState = {
  ingredientsData: [],
  isLoading: false,
  errorMessage: null
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
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredientsData = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Ошибка загрузки';
      });
  }
});

export default ingredientsSlice.reducer;
