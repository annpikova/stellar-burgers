import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import { useParams, useLocation } from 'react-router-dom';
import { getOrders } from '../../services/slices/orderSlice';

/**
 * Компонент детальной информации о заказе.
 * Используется и как страница, и как модалка.
 */
export const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  const isFeedPage = location.pathname.includes('/feed');

  const feedOrders = useSelector((state: RootState) => state.feeds.orders);
  const userOrders = useSelector((state: RootState) => state.order.orderList);

  const orders = isFeedPage ? feedOrders : userOrders;

  // Подгружаем заказы в личном кабинете, если они не загружены
  useEffect(() => {
    if (!isFeedPage && userOrders.length === 0) {
      dispatch(getOrders());
    }
  }, [isFeedPage, userOrders.length, dispatch]);

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredientsData
  );

  const orderData = useMemo(() => {
    if (!number) return null;
    return orders.find((el) => +el.number === +number);
  }, [number, orders]);

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientCountMap = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce<TIngredientCountMap>(
      (acc, id) => {
        if (!acc[id]) {
          const ingredient = ingredients.find((ing) => ing._id === id);
          if (ingredient) {
            acc[id] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[id].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
