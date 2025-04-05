import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  getUserApi,
  getOrdersApi,
  updateUserApi,
  logoutApi,
  getOrderByNumberApi
} from '@api';

/* ---------------------------- Async Thunks ---------------------------- */

/**
 * Регистрация пользователя.
 */
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

/**
 * Авторизация пользователя.
 */
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

/**
 * Выход пользователя из аккаунта.
 */
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => await logoutApi()
);

/**
 * Обновление данных пользователя.
 */
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

/**
 * Получение всех заказов пользователя.
 */
export const getAllUserOrders = createAsyncThunk(
  'user/getAllUserOrders',
  async () => await getOrdersApi()
);

/**
 * Получение заказа по номеру.
 */
export const getOrderByNumber = createAsyncThunk(
  'user/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

/**
 * Проверка, авторизован ли пользователь.
 */
export const checkIsUserLogged = createAsyncThunk(
  'user/checkIsUserLogged',
  async () => await getUserApi()
);

/* ------------------------------ State ------------------------------ */

/**
 * Состояние пользователя в приложении.
 */
export type TUserState = {
  userInfo: TUser;
  isLoggedIn: boolean;
  errorMessage: string;
  isLoading: boolean;
  orderData: TOrder | null;
  allUserOrders: TOrder[];
};

/**
 * Начальное состояние.
 */
export const initialState: TUserState = {
  userInfo: { email: '', name: '' },
  isLoggedIn: false,
  errorMessage: '',
  isLoading: false,
  orderData: null,
  allUserOrders: []
};

/* ----------------------------- Slice ----------------------------- */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* --- Регистрация --- */
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка регистрации';
        state.isLoading = false;
      });

    /* --- Вход --- */
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка авторизации';
        state.isLoading = false;
      });

    /* --- Выход --- */
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = { email: '', name: '' };
        deleteCookie('accessToken');
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка выхода';
      });

    /* --- Обновление профиля --- */
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'Ошибка обновления профиля';
      });

    /* --- Проверка логина --- */
    builder
      .addCase(checkIsUserLogged.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(checkIsUserLogged.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка получения данных';
        state.isLoading = false;
      });

    /* --- Заказы пользователя --- */
    builder
      .addCase(getAllUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUserOrders = action.payload;
      })
      .addCase(getAllUserOrders.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка получения заказов';
        state.isLoading = false;
      });
  }
});

export default userSlice.reducer;
