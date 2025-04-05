import { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

/**
 * Отображает статус заказа с цветной подписью.
 * Используется в карточке заказа и подробной информации.
 */
const statusConfig: Record<string, { text: string; color: string }> = {
  pending: {
    text: 'Готовится',
    color: '#E52B1A'
  },
  done: {
    text: 'Выполнен',
    color: '#00CCCC'
  },
  created: {
    text: 'Создан',
    color: '#F2F2F3'
  }
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const { text, color } = statusConfig[status] || {
    text: 'Неизвестно',
    color: '#999999'
  };

  return <OrderStatusUI textStyle={color} text={text} />;
};
