import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

/**
 * Тип состояния фида заказов.
 */
export type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isFeedsLoading: boolean;
};

/**
 * Начальное состояние для фида заказов.
 */
export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedsLoading: false
};

/**
 * Асинхронный thunk для получения заказов из публичного фида.
 */
export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

/**
 * Срез состояния для публичного фида заказов (страница `/feed`).
 */
const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isFeedsLoading = false;
      });
  }
});

export default feedsSlice.reducer;
