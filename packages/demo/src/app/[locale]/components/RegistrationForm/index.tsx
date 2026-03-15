'use client'; // ← Добавить в самое начало файла!
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import {
  registrationSchema,
  type RegistrationFormData,
} from '../../components/RegistrationForm/schema';
import { usersApi, type CreateUserDto } from '../../../services/users.api';
import { useState } from 'react';

export default function RegistrationForm() {
  const t = useTranslations('Form');
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

    setApiError(null);
    setApiSuccess(false);

    try {
      const userData: CreateUserDto = {
        name: data.email.split('@')[0] || 'User',
        email: data.email,
        phone: '+79991234567',
        website: 'example.com',
      };

      const response = await usersApi.create(userData);
      console.log('✅ API Response:', response.data);
      setApiSuccess(true);
      reset();
    } catch (error: any) {
      console.error('❌ API Error:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Ошибка при отправке данных';
      setApiError(errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label={t('email')}
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            placeholder={t('emailPlaceholder')}
          />

          <TextField
            label={t('password')}
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            placeholder={t('passwordPlaceholder')}
          />

          <TextField
            label={t('confirmPassword')}
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />

          <TextField
            label={t('age')}
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
            disabled={isSubmitting || !isValid}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>

          {Object.keys(errors).length > 0 && (
            <Alert severity="error">{t('errors.fixErrors')}</Alert>
          )}

          <Alert severity="info">
            <strong>{t('validationInfo.title')}</strong>
            <br />• {t('validationInfo.email')}
            <br />• {t('validationInfo.password')}
            <br />• {t('validationInfo.match')}
            <br />• {t('validationInfo.age')}
          </Alert>

          {apiSuccess && (
            <Alert severity="success">✅ Данные отправлены на сервер!</Alert>
          )}

          {apiError && <Alert severity="error">❌ {apiError}</Alert>}
        </Stack>
      </form>
    </>
  );
}
