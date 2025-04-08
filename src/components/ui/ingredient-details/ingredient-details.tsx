import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

/**
 * UI-компонент: отображает подробную информацию об ингредиенте.
 * Включает картинку, название и таблицу нутриентов.
 */
export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    const nutrition = [
      { label: 'Калории, ккал', value: calories },
      { label: 'Белки, г', value: proteins },
      { label: 'Жиры, г', value: fat },
      { label: 'Углеводы, г', value: carbohydrates }
    ];

    return (
      <div className={styles.content}>
        <img
          className={styles.img}
          alt={`Изображение ингредиента: ${name}`}
          src={image_large}
        />
        <h3
          className='text text_type_main-medium mt-2 mb-4'
          data-cy='ingredient-name'
        >
          {name}
        </h3>
        <ul
          className={`${styles.nutritional_values} text_type_main-default`}
          role='list'
        >
          {nutrition.map((item, index) => (
            <li
              key={index}
              className={styles.nutritional_value}
              role='listitem'
            >
              <p className={`text mb-2 ${styles.text}`}>{item.label}</p>
              <p className='text text_type_digits-default'>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
