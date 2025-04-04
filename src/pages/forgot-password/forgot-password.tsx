import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

/**
 * Страница восстановления пароля.
 * Отправляет email пользователя на сервер, чтобы начать процесс сброса пароля.
 *
 * @returns JSX-элемент страницы "Забыли пароль"
 */
export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Обработчик отправки формы
   * @param e Событие формы
   */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Введите email');
      return;
    }

    setError(null);

    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        setError(err?.message || 'Произошла ошибка при отправке письма');
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error ?? undefined}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
