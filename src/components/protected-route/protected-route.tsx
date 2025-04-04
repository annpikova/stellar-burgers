import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

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

  if (publicRoute && isLoggedIn) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!publicRoute && !isLoggedIn) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
