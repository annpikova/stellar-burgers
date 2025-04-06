import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

/**
 * Асинхронный thunk для сохранения заказа на сервере.
 */
export const saveBurger = createAsyncThunk<TOrder, string[]>(
  'constructor/saveBurger',
  async (orderData) => {
    const response = await orderBurgerApi(orderData);
    return response.order;
  }
);

/**
 * Состояние конструктора бургера.
 */
type TConstructorState = {
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  errorMessage: string | null;
};

const initialState: TConstructorState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  errorMessage: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    /**
     * Добавление ингредиента в конструктор.
     */
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const payload = action.payload;
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    /**
     * Удаление ингредиента по его ID.
     */
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },

    /**
     * Перемещение ингредиента вверх.
     */
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const { ingredients } = state.constructorItems;
      if (action.payload > 0 && action.payload < ingredients.length) {
        const item = ingredients.splice(action.payload - 1, 1)[0];
        ingredients.splice(action.payload, 0, item);
      }
    },

    /**
     * Перемещение ингредиента вниз.
     */
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const { ingredients } = state.constructorItems;
      if (action.payload < ingredients.length - 1) {
        const item = ingredients.splice(action.payload + 1, 1)[0];
        ingredients.splice(action.payload, 0, item);
      }
    },

    /**
     * Сброс данных модального окна заказа.
     */
    resetModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBurger.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
        state.errorMessage = null;
      })
      .addCase(saveBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(saveBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.errorMessage = action.error.message || 'Ошибка запроса';
      });
  }
});

// Экспортируем экшены и редьюсер
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetModal
} = constructorSlice.actions;

export default constructorSlice.reducer;
