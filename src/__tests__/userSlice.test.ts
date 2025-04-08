import { expect, test, describe, beforeAll } from '@jest/globals';
import userReducer, {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getAllUserOrders,
  checkIsUserLogged,
  initialState
} from '../services/slices/userSlice';

// Мокаем localStorage для тестов
beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    },
    writable: true
  });
});

describe('userSlice', () => {
  describe('registerUser', () => {
    it('pending', () => {
      const state = userReducer(initialState, { type: registerUser.pending.type });
      expect(state.isLoading).toBe(true);
    });

    it('fulfilled', () => {
      const payload = { user: { name: 'Test', email: 'test@mail.com' } };
      const state = userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload
      });

      expect(state.isLoading).toBe(false);
      expect(state.userInfo).toEqual(payload.user);
      expect(state.isLoggedIn).toBe(true);
    });

    it('rejected', () => {
      const error = { message: 'Ошибка регистрации' };
      const state = userReducer(initialState, {
        type: registerUser.rejected.type,
        error
      });
      expect(state.errorMessage).toBe(error.message);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('loginUser', () => {
    it('pending', () => {
      const state = userReducer(initialState, { type: loginUser.pending.type });
      expect(state.isLoading).toBe(true);
    });

    it('fulfilled', () => {
      const payload = { user: { name: 'Test', email: 'test@mail.com' } };
      const state = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload
      });

      expect(state.userInfo).toEqual(payload.user);
      expect(state.isLoggedIn).toBe(true);
    });

    it('rejected', () => {
      const error = { message: 'Ошибка авторизации' };
      const state = userReducer(initialState, {
        type: loginUser.rejected.type,
        error
      });
      expect(state.errorMessage).toBe(error.message);
    });
  });

  describe('logoutUser', () => {
    it('pending', () => {
      const state = userReducer(initialState, { type: logoutUser.pending.type });
      expect(state.isLoading).toBe(true);
    });

    it('fulfilled', () => {
      const prevState = { ...initialState, isLoggedIn: true, userInfo: { name: 'A', email: 'B' } };
      const state = userReducer(prevState, { type: logoutUser.fulfilled.type });

      expect(state.userInfo).toEqual({ name: '', email: '' });
      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe('updateUser', () => {
    it('fulfilled', () => {
      const payload = { user: { name: 'Updated', email: 'new@mail.com' } };
      const state = userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload
      });

      expect(state.userInfo).toEqual(payload.user);
      expect(state.isLoggedIn).toBe(true);
    });
  });

  describe('checkIsUserLogged', () => {
    it('fulfilled', () => {
      const payload = { user: { name: 'User', email: 'user@mail.com' } };
      const state = userReducer(initialState, {
        type: checkIsUserLogged.fulfilled.type,
        payload
      });

      expect(state.userInfo).toEqual(payload.user);
      expect(state.isLoggedIn).toBe(true);
    });

    it('rejected', () => {
      const error = { message: 'Ошибка получения данных' };
      const state = userReducer(initialState, {
        type: checkIsUserLogged.rejected.type,
        error
      });

      expect(state.errorMessage).toBe(error.message);
    });
  });

  describe('getAllUserOrders', () => {
    it('fulfilled', () => {
      const payload = ['order1', 'order2'];
      const state = userReducer(initialState, {
        type: getAllUserOrders.fulfilled.type,
        payload
      });

      expect(state.allUserOrders).toEqual(payload);
    });
  });
});
