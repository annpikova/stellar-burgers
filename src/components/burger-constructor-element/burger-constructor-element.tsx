import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../../services/slices/constructorSlice';

/**
 * Элемент начинки в списке конструктора.
 * Обрабатывает перемещение и удаление ингредиента.
 */
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const onMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };

    const onMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };

    const onRemove = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={onMoveUp}
        handleMoveDown={onMoveDown}
        handleClose={onRemove}
      />
    );
  }
);
