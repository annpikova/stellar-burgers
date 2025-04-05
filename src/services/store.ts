import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import feedsReducer from './slices/feedsSlice';
import userReducer from './slices/userSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';

/**
 * Создание Redux-хранилища с включёнными devTools в режиме разработки.
 */
const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    feeds: feedsReducer,
    user: userReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

/* ------------------------- Типы хранилища ------------------------- */

/**
 * Тип всего Redux-хранилища.
 */
export type AppStore = typeof store;

/**
 * Тип корневого состояния.
 */
export type RootState = ReturnType<AppStore['getState']>;

/**
 * Тип диспетчера действий.
 */
export type AppDispatch = AppStore['dispatch'];

/* ------------------------ Кастомные хуки ------------------------ */

/**
 * Кастомный useDispatch с типизацией.
 */
export const useDispatch: () => AppDispatch = () =>
  useReduxDispatch<AppDispatch>();

/**
 * Кастомный useSelector с типом состояния.
 */
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
