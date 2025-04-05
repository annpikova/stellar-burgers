import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredient } from '@components';

/**
 * UI-компонент: отображает список ингредиентов по категории (булки, соусы, начинки).
 */
export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
  <>
    <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
      {title}
    </h3>
    <ul
      className={styles.items}
      ref={ref}
      role='list'
      aria-label={`Список ингредиентов категории ${title}`}
    >
      {ingredients.map((ingredient) => (
        <li key={ingredient._id} role='listitem'>
          <BurgerIngredient
            ingredient={ingredient}
            count={ingredientsCounters[ingredient._id]}
          />
        </li>
      ))}
    </ul>
  </>
));
