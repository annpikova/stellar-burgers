import { FC, memo } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

/**
 * Компонент отображения списка заказов.
 * Сортирует заказы по дате — сначала новые.
 */
export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const ordersSortedByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={ordersSortedByDate} />;
});
