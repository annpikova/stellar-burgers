import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

/**
 * Компонент отображения одной категории ингредиентов (булки, начинки, соусы).
 * Вычисляет счётчики и прокидывает их в UI-компонент.
 */
export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = constructorItems;
    const counters: Record<string, number> = {};

    ingredients.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [constructorItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
