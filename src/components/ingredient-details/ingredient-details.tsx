import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { RootState } from '../../services/store';

/**
 * Компонент отображения подробностей ингредиента.
 * Используется как модалка и как страница.
 */
export const IngredientDetails: FC = () => {
  const allIngredients = useSelector(
    (state: RootState) => state.ingredients.ingredientsData
  );

  const { id } = useParams<{ id: string }>();

  const selectedIngredient = allIngredients.find((i) => i._id === id);

  if (!selectedIngredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};
