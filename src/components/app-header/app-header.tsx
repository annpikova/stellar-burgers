import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

/**
 * Компонент шапки приложения.
 * Показывает навигацию и имя пользователя (если авторизован).
 */
export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.userInfo?.name);

  return <AppHeaderUI userName={userName || ''} />;
};
