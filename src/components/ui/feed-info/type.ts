export type FeedInfoUIProps = {
  feed: {
    total: number;
    totalToday: number;
  };
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  colorType?: 'ready' | 'default'; // ограничиваем возможные значения
};

export type TColumnProps = {
  title: string;
  content: number;
};
