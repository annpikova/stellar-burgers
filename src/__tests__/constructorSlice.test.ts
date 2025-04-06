import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetModal,
  saveBurger
} from '../services/slices/constructorSlice';

import ingredientsSlice from '../services/slices/ingredientsSlice';
import feedsSlice from '../services/slices/feedsSlice';
import userSlice from '../services/slices/userSlice';
import orderSlice from '../services/slices/orderSlice';

import { orderBurgerApi } from '../utils/burger-api';
import type { TConstructorIngredient, TOrder } from '../utils/types';
import type { AppStore } from '../services/store';

jest.mock('../utils/burger-api');

describe('constructorSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsSlice,
        feeds: feedsSlice,
        user: userSlice,
        burgerConstructor: constructorSlice,
        order: orderSlice
      }
    });
  });

  describe('синхронные экшены', () => {
    it('добавляет ингредиент', () => {
      const ingredient: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'main',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 100,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };

      store.dispatch(addIngredient(ingredient));
      const state = store.getState().burgerConstructor;
      ingredient.id = state.constructorItems.ingredients[0].id;

      expect(state.constructorItems.ingredients).toEqual([ingredient]);
    });

    it('удаляет ингредиент', () => {
      const ingredient = {
        _id: '1',
        name: 'test',
        type: 'main',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 50,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };

      store.dispatch(addIngredient(ingredient));
      const id = store.getState().burgerConstructor.constructorItems.ingredients[0].id;
      store.dispatch(removeIngredient(id));

      expect(store.getState().burgerConstructor.constructorItems.ingredients).toEqual([]);
    });

    it('перемещает ингредиент вверх', () => {
      const ing1 = { ...mockIngredient('1'), id: '' };
      const ing2 = { ...mockIngredient('2'), id: '' };

      store.dispatch(addIngredient(ing1));
      store.dispatch(addIngredient(ing2));

      const ids = store.getState().burgerConstructor.constructorItems.ingredients.map(i => i.id);
      store.dispatch(moveIngredientUp(1));

      const resultIds = store.getState().burgerConstructor.constructorItems.ingredients.map(i => i.id);
      expect(resultIds).toEqual([ids[1], ids[0]]);
    });

    it('сбрасывает orderModalData при resetModal', () => {
      const fakeOrder: TOrder = {
        _id: '123',
        status: 'done',
        number: 456,
        name: 'test order',
        ingredients: [],
        createdAt: '',
        updatedAt: ''
      };

      store.dispatch({
        type: 'constructor/saveBurger/fulfilled',
        payload: { order: fakeOrder }
      });

      store.dispatch(resetModal());
      expect(store.getState().burgerConstructor.orderModalData).toBeNull();
    });
  });

  describe('асинхронный экшен saveBurger', () => {
    it('успешный запрос', async () => {
      const response: TOrder = {
        _id: '1',
        status: 'created',
        number: 101,
        name: 'Success Burger',
        ingredients: [],
        createdAt: '',
        updatedAt: ''
      };

      (orderBurgerApi as jest.Mock).mockResolvedValue({ order: response });

      await store.dispatch(saveBurger(['bun', 'main']));

      const state = store.getState().burgerConstructor;
      expect(state.orderModalData).toEqual(response);
      expect(state.constructorItems.ingredients).toEqual([]);
      expect(state.constructorItems.bun).toBeNull();
    });

    it('ошибка запроса', async () => {
      const errorMessage = 'Ошибка сохранения бургера';
      (orderBurgerApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await store.dispatch(saveBurger(['bun', 'main']));
      const state = store.getState().burgerConstructor;

      expect(state.errorMessage).toBe(errorMessage);
      expect(state.orderModalData).toBeNull();
    });
  });
});

// Вспомогательная функция для создания ингредиентов
const mockIngredient = (id: string): TConstructorIngredient => ({
  _id: id,
  name: `ingredient-${id}`,
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: '',
  id
});
