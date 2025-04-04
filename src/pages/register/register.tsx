import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/slices/userSlice';

/**
 * Компонент страницы регистрации.
 * Обрабатывает форму регистрации пользователя.
 * При успешной регистрации перенаправляет на главную страницу.
 *
 * @returns JSX-элемент страницы регистрации
 */
export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const error = useSelector((state) => state.user.errorMessage);

  /** Редирект на главную, если пользователь уже зарегистрирован */
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  /**
   * Обработчик отправки формы регистрации
   * @param e Событие отправки формы
   */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || !userName) return;

    dispatch(registerUser({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText={error ? String(error) : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
