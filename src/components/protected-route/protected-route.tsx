import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { useEffect, useState } from 'react';
import { Preloader } from '@ui'; // Импортируем компонент прелоадера

type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

/**
 * Компонент защищённого маршрута.
 * Блокирует доступ к приватным страницам для неавторизованных пользователей.
 * Не пускает авторизованных на страницы логина/регистрации и т.п.
 */
export const ProtectedRoute = ({
  publicRoute,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки данных

  useEffect(() => {
    // Имитация загрузки данных о пользователе
    const loadData = async () => {
      // В реальном приложении здесь будет вызов API для загрузки данных пользователя
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка для имитации загрузки
      setIsLoading(false); // После загрузки данных изменяем состояние на завершено
    };
    loadData();
  }, []);

  // Показываем прелоадер, пока идет загрузка данных
  if (isLoading) {
    return <Preloader />;
  }

  if (publicRoute && isLoggedIn) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!publicRoute && !isLoggedIn) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
