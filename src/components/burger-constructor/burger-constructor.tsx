import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { resetModal, saveBurger } from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../services/store';

/**
 * Контейнер логики конструктора бургера.
 * Считает цену, обрабатывает оформление заказа.
 */
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  // Список ID ингредиентов для заказа
  const ingredientIds = useMemo(() => {
    if (!constructorItems.bun) return [];
    const bunId = constructorItems.bun._id;
    const ingredientIds = constructorItems.ingredients.map((i) => i._id);
    return [bunId, ...ingredientIds, bunId]; // булка дважды
  }, [constructorItems]);

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (constructorItems.bun) {
      dispatch(saveBurger(ingredientIds));
    }
    // иначе ничего не делаем — не показываем пустую корзину
  };

  const closeOrderModal = () => {
    dispatch(resetModal());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
