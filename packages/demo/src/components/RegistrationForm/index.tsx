'use client';

// 1. Импортируем ВСЕ необходимое
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { RegistrationFormData, registrationSchema } from './schema';
import { usersApi, type CreateUserDto } from '../../app/services/users.api';

export default function RegistrationForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      age: 18,
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('📨 Отправка данных:', data);

    // Сбрасываем предыдущие состояния
    setApiError(null);
    setApiSuccess(false);

    try {
      // 1. Подготавливаем данные для API
      const userData: CreateUserDto = {
        name: data.email.split('@')[0] || 'User', // Имя из email
        email: data.email,
        phone: '+79991234567', // Заглушка
        website: 'example.com', // Заглушка
      };

      // 2. Отправляем запрос к реальному API
      const response = await usersApi.create(userData);

      console.log('✅ API Response:', response.data);

      // 3. Показываем успех
      setApiSuccess(true);

      // 4. Сбрасываем форму
      reset();
    } catch (error: any) {
      console.error('❌ API Error:', error);

      // 5. Обрабатываем ошибку
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Ошибка при отправке данных';
      setApiError(errorMessage);
    }
  };

  const handleCloseSnackbar = () => {
    setApiError(null);
    setApiSuccess(false);
  };

  console.log(
    'isSubmitting || Object.keys(errors).length > 0',
    isSubmitting,
    Object.keys(errors).length > 0,
    errors,
  );
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            placeholder="user@example.com"
          />

          <TextField
            label="Пароль"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            placeholder="Минимум 8 символов, цифра и заглавная буква"
          />

          <TextField
            label="Подтверждение пароля"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />

          <TextField
            label="Возраст"
            type="number"
            {...register('age', {
              valueAsNumber: true,
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
            fullWidth
            InputProps={{
              inputProps: { min: 18, max: 100 },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
          </Button>

          {Object.keys(errors).length > 0 && (
            <Alert severity="error">Исправьте ошибки в форме</Alert>
          )}

          <Alert severity="info">
            <strong>Проверьте:</strong>
            <br />
            • Некорректный email
            <br />
            • Пароль без цифры/заглавной буквы
            <br />
            • Разные пароли
            <br />• Возраст меньше 18
          </Alert>
        </Stack>
      </form>
      <Snackbar
        open={apiSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          ✅ Данные отправлены на сервер! (ID: будет в консоли)
        </Alert>
      </Snackbar>

      {/* Уведомление об ошибке API */}
      <Snackbar
        open={!!apiError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          ❌ {apiError}
        </Alert>
      </Snackbar>
    </>
  );
}
