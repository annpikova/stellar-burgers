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

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return response;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const getAllUserOrders = createAsyncThunk(
  'user/getAllUserOrders',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'user/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const checkIsUserLogged = createAsyncThunk(
  'user/checkIsUserLogged',
  async () => await getUserApi()
);

/* ------------------------------ State ------------------------------ */

export type TUserState = {
  userInfo: TUser;
  isLoggedIn: boolean;
  errorMessage: string;
  isLoading: boolean;
  orderData: TOrder | null;
  allUserOrders: TOrder[];
};

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
    // Регистрация
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка регистрации';
        state.isLoading = false;
      });

    // Вход
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка авторизации';
        state.isLoading = false;
      });

    // Выход
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = { email: '', name: '' };
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка выхода';
        state.isLoading = false;
      });

    // Обновление профиля
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
        state.isLoading = false;
      });

    // Проверка логина
    builder
      .addCase(checkIsUserLogged.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkIsUserLogged.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(checkIsUserLogged.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка получения данных';
        state.isLoading = false;
      });

    // Заказы пользователя
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
