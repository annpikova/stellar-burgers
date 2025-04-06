import { expect, test, describe } from '@jest/globals';
import orderReducer, {
  fetchOneOrder,
  getOrders,
  initialState
} from '../services/slices/orderSlice';

describe('orderSlice reducer', () => {
  const fetchOneOrderActions = {
    pending: {
      type: fetchOneOrder.pending.type
    },
    fulfilled: {
      type: fetchOneOrder.fulfilled.type,
      payload: { orders: ['order1', 'order2', 'order3'] }
    },
    rejected: {
      type: fetchOneOrder.rejected.type,
      error: { message: 'Ошибка загрузки заказа' }
    }
  };

  const getOrdersActions = {
    pending: {
      type: getOrders.pending.type
    },
    fulfilled: {
      type: getOrders.fulfilled.type,
      payload: ['order1', 'order2', 'order3']
    },
    rejected: {
      type: getOrders.rejected.type,
      error: { message: 'Ошибка загрузки заказов' }
    }
  };

  describe('fetchOneOrder', () => {
    it('pending', () => {
      const state = orderReducer(initialState, fetchOneOrderActions.pending);
      expect(state.errorMessage).toBeNull();
      expect(state.isRequesting).toBe(true);
    });

    it('fulfilled', () => {
      const state = orderReducer(initialState, fetchOneOrderActions.fulfilled);
      expect(state.errorMessage).toBeNull();
      expect(state.isRequesting).toBe(false);
      expect(state.currentOrder).toEqual(
        fetchOneOrderActions.fulfilled.payload.orders[0]
      );
    });

    it('rejected', () => {
      const state = orderReducer(initialState, fetchOneOrderActions.rejected);
      expect(state.errorMessage).toBe(fetchOneOrderActions.rejected.error.message);
      expect(state.isRequesting).toBe(false);
    });
  });

  describe('getOrders', () => {
    it('pending', () => {
      const state = orderReducer(initialState, getOrdersActions.pending);
      expect(state.errorMessage).toBeNull();
      expect(state.isRequesting).toBe(true);
    });

    it('fulfilled', () => {
      const state = orderReducer(initialState, getOrdersActions.fulfilled);
      expect(state.errorMessage).toBeNull();
      expect(state.isRequesting).toBe(false);
      expect(state.orderList).toEqual(getOrdersActions.fulfilled.payload);
    });

    it('rejected', () => {
      const state = orderReducer(initialState, getOrdersActions.rejected);
      expect(state.errorMessage).toBe(getOrdersActions.rejected.error.message);
      expect(state.isRequesting).toBe(false);
    });
  });
});
