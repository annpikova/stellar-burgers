import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';

import { updateUser } from '../../services/slices/userSlice';
import { ProfileUI } from '@ui-pages';

/**
 * Компонент страницы профиля пользователя.
 * Позволяет просматривать и редактировать личные данные (имя, email, пароль).
 * Отображает кнопки "Сохранить" и "Отмена", если форма изменена.
 * Данные берутся из Redux-хранилища.
 */
export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // При изменении user в хранилище обновляем форму
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  // Проверка, изменилась ли форма
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  /**
   * Отправка формы на сервер
   * @param e Событие отправки формы
   */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  /**
   * Отмена редактирования и возврат к текущим данным пользователя
   * @param e Событие нажатия на кнопку "Отмена"
   */
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  /**
   * Обновление состояния формы при вводе данных
   * @param e Событие изменения input
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
