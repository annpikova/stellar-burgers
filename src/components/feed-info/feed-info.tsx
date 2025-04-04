import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

/**
 * Компонент-обёртка над FeedInfoUI.
 * Извлекает заказы и статистику из стора, формирует данные для отображения.
 */
export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.feeds.orders);
  const total = useSelector((state) => state.feeds.total);
  const totalToday = useSelector((state) => state.feeds.totalToday);

  /**
   * Функция фильтрует заказы по статусу и возвращает номера
   * @param status статус заказа ("done", "pending")
   * @returns массив номеров заказов
   */
  const getOrders = (status: string): number[] =>
    orders
      .filter((item) => item.status === status)
      .map((item) => item.number)
      .slice(0, 20);

  const readyOrders = getOrders('done');
  const pendingOrders = getOrders('pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
