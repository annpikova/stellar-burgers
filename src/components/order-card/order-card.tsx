import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

const MAX_INGREDIENTS_PREVIEW = 6;

/**
 * Карточка одного заказа.
 * Вычисляет ингредиенты, сумму, скрытые ингредиенты и дату.
 */
export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const ingredientsData: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.ingredientsData
  );

  const orderInfo = useMemo(() => {
    if (!ingredientsData.length) return null;

    const ingredientsInfo = order.ingredients
      .map((id) => ingredientsData.find((ing) => ing._id === id))
      .filter((item): item is TIngredient => Boolean(item));

    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);

    const previewIngredients = ingredientsInfo.slice(
      0,
      MAX_INGREDIENTS_PREVIEW
    );
    const hiddenCount = Math.max(
      ingredientsInfo.length - MAX_INGREDIENTS_PREVIEW,
      0
    );

    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow: previewIngredients,
      remains: hiddenCount,
      total,
      date
    };
  }, [order, ingredientsData]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS_PREVIEW}
      locationState={{ background: location }}
    />
  );
});
