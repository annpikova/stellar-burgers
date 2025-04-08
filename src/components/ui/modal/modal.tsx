import { FC, memo } from 'react';
import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

/**
 * UI-компонент модального окна с заголовком и возможностью закрытия.
 */
export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div
        className={styles.modal}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div className={styles.header}>
          {title && (
            <h3
              id='modal-title'
              className={`${styles.title} text text_type_main-large`}
            >
              {title}
            </h3>
          )}
          <button
            className={styles.button}
            type='button'
            onClick={onClose}
            aria-label='Закрыть модальное окно'
            data-cy='close-button'
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
