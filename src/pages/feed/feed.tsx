import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { fetchFeeds } from '../../services/slices/feedsSlice';

/**
 * Страница "Лента заказов".
 * Загружает и отображает список всех заказов в системе.
 * При отсутствии данных делает запрос к API.
 * Пока идёт загрузка — отображает прелоадер.
 */
export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.feeds.orders);
  const isFeedsLoading = useSelector((state) => state.feeds.isFeedsLoading); // если есть такой флаг

  // Запрашиваем данные при первой загрузке страницы
  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, orders.length]);

  // Показываем прелоадер, если данные ещё не получены
  if (!orders.length || isFeedsLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
