import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/slices/userSlice';

/**
 * Страница входа в систему.
 *
 * Позволяет пользователю авторизоваться с помощью email и пароля.
 * В случае успешной авторизации перенаправляет на главную страницу.
 *
 * @returns Компонент страницы авторизации
 */
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const error = useSelector((state) => state.user.errorMessage);

  /**
   * Если пользователь уже авторизован — перенаправляем на главную.
   */
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  /**
   * Обработчик отправки формы.
   *
   * @param e Событие отправки формы
   */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
