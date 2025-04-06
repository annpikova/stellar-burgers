import { FC } from 'react';
import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

/**
 * Страница конструктора бургеров.
 * Отображает список ингредиентов и текущую сборку бургера.
 * Если данные ингредиентов ещё загружаются — показывает прелоадер.
 */
export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  // Показываем прелоадер, пока ингредиенты загружаются
  if (isIngredientsLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
