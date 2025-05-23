import React, { FC, memo } from 'react';
import styles from './feed-info.module.css';

import { FeedInfoUIProps, HalfColumnProps, TColumnProps } from './type';

/**
 * Компонент отображает информацию о заказах: списки "Готовы", "В работе",
 * а также общее количество заказов за всё время и за сегодня.
 */
export const FeedInfoUI: FC<FeedInfoUIProps> = memo(
  ({ feed, readyOrders, pendingOrders }) => {
    const { total, totalToday } = feed;

    return (
      <section>
        <div className={styles.columns}>
          <HalfColumn orders={readyOrders} title='Готовы' colorType='ready' />
          <HalfColumn
            orders={pendingOrders}
            title='В работе'
            colorType='default'
          />
        </div>
        <Column title='Выполнено за все время' content={total} />
        <Column title='Выполнено за сегодня' content={totalToday} />
      </section>
    );
  }
);

/**
 * Подкомпонент — колонка со списком номеров заказов.
 */
const HalfColumn: FC<HalfColumnProps> = ({
  orders,
  title,
  colorType = 'default'
}) => (
  <div className={`pr-6 ${styles.column}`}>
    <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <ul className={`pt-6 ${styles.list}`}>
      {orders.map((orderNumber) => (
        <li
          key={orderNumber}
          className={`text text_type_digits-default ${styles.list_item} ${
            colorType === 'ready' ? styles.ready : ''
          }`}
        >
          {orderNumber}
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Подкомпонент — блок с цифрой и заголовком.
 */
const Column: FC<TColumnProps> = ({ title, content }) => (
  <>
    <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>
      {title}:
    </h3>
    <p className={`text text_type_digits-large ${styles.content}`}>{content}</p>
  </>
);
