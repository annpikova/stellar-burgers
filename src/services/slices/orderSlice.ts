import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi } from '@api';

/**
 * Состояние заказов.
 */
type TOrderState = {
  orderList: TOrder[];
  currentOrder: TOrder | null;
  isRequesting: boolean;
  lastResponse: null;
  errorMessage: string | null;
};

/**
 * Начальное состояние для заказов.
 */
export const initialState: TOrderState = {
  orderList: [],
  currentOrder: null,
  isRequesting: false,
  lastResponse: null,
  errorMessage: null
};

/**
 * Получение одного заказа по номеру.
 * @param number - номер заказа
 */
export const fetchOneOrder = createAsyncThunk(
  'order/fetchGetOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

/**
 * Получение списка заказов пользователя.
 */
export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

/**
 * Слайс управления заказами.
 */
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    /**
     * Получение полного состояния заказов.
     */
    getOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneOrder.pending, (state) => {
        state.errorMessage = null;
        state.isRequesting = true;
      })
      .addCase(fetchOneOrder.fulfilled, (state, action) => {
        state.errorMessage = null;
        state.isRequesting = false;
        state.currentOrder = action.payload.orders[0];
      })
      .addCase(fetchOneOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка загрузки заказа';
        state.isRequesting = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.errorMessage = null;
        state.isRequesting = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.errorMessage = null;
        state.isRequesting = false;
        state.orderList = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Ошибка загрузки заказов';
        state.isRequesting = false;
      });
  }
});

export const { getOrderState } = orderSlice.selectors;
export default orderSlice.reducer;
