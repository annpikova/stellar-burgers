import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';

import { getOrders } from '../../services/slices/orderSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

/**
 * Страница истории заказов пользователя.
 *
 * Загружает список заказов пользователя при монтировании компонента.
 * Доступна только авторизованным пользователям.
 *
 * @returns Компонент истории заказов
 */
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.order.orderList);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
