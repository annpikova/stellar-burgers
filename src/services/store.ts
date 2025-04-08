import { configureStore, combineReducers } from '@reduxjs/toolkit';
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

/* ------------------------- Root Reducer ------------------------- */

/**
 * Корневой редьюсер, объединяющий все слайсы.
 * Экспортируется отдельно для unit-тестов.
 */
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer
});

/* ---------------------- Redux Store ---------------------- */

/**
 * Конфигурация Redux-хранилища.
 */
const store = configureStore({
  reducer: rootReducer,
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

/* --------------------------- Экспорт --------------------------- */

export default store;
