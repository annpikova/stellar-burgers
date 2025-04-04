import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

/**
 * UI-компонент конструктора бургера. Показывает булки, начинки, стоимость и оформляет заказ.
 */
export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const hasBun = Boolean(constructorItems.bun);
  const hasIngredients = constructorItems.ingredients.length > 0;

  const NoBunBlock = ({ position }: { position: 'top' | 'bottom' }) => (
    <div
      className={`${styles.noBuns} ${styles[`noBuns${position === 'top' ? 'Top' : 'Bottom'}`]} ml-8 mb-4 mr-5 text text_type_main-default`}
    >
      Выберите булки
    </div>
  );

  const NoIngredientsBlock = () => (
    <div
      className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
    >
      Выберите начинку
    </div>
  );

  return (
    <section className={styles.burger_constructor}>
      {hasBun ? (
        <div className={`${styles.element} mb-4 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked
            text={`${constructorItems.bun!.name} (верх)`}
            price={constructorItems.bun!.price}
            thumbnail={constructorItems.bun!.image}
          />
        </div>
      ) : (
        <NoBunBlock position='top' />
      )}

      <ul className={styles.elements}>
        {hasIngredients ? (
          constructorItems.ingredients.map(
            (item: TConstructorIngredient, index: number) => (
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                totalItems={constructorItems.ingredients.length}
                key={item.id}
              />
            )
          )
        ) : (
          <NoIngredientsBlock />
        )}
      </ul>

      {hasBun ? (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${constructorItems.bun!.name} (низ)`}
            price={constructorItems.bun!.price}
            thumbnail={constructorItems.bun!.image}
          />
        </div>
      ) : (
        <NoBunBlock position='bottom' />
      )}

      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={onOrderClick}
        >
          Оформить заказ
        </Button>
      </div>

      {orderRequest && (
        <Modal onClose={closeOrderModal} title='Оформляем заказ...'>
          <Preloader />
        </Modal>
      )}

      {orderModalData && !orderRequest && (
        <Modal onClose={closeOrderModal} title='Детали заказа'>
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
