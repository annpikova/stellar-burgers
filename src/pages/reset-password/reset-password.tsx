import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';

/**
 * Страница сброса пароля.
 * Предоставляет форму для ввода нового пароля и токена из письма.
 * После успешного сброса пароля — перенаправляет на страницу логина.
 *
 * @returns JSX-элемент страницы сброса пароля
 */
export const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Обработчик отправки формы сброса пароля
   * @param e Событие отправки формы
   */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!password || !token) {
      setError('Все поля обязательны');
      return;
    }

    setError(null);

    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => {
        setError(err?.message || 'Ошибка сброса пароля');
      });
  };

  /**
   * Проверка наличия маркера доступа к сбросу пароля.
   * Если пользователь не пришёл со страницы "забыл пароль" — редирект.
   */
  useEffect(() => {
    const isResetFlowAllowed = localStorage.getItem('resetPassword');
    if (!isResetFlowAllowed) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error ?? undefined}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
