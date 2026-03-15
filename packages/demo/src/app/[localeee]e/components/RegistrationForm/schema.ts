
import { z } from 'zod';

// ================================
// 1. БАЗОВАЯ СХЕМА
// ================================

export const registrationSchema = z
  .object({
    email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
    password: z
      .string()
      .min(8, 'Минимум 8 символов')
      .regex(/[A-Z]/, 'Должна быть заглавная буква')
      .regex(/\d/, 'Должна быть цифра'),
    age: z.number().min(18, 'Минимум 18 лет').max(100, 'Максимум 100 лет'),
    confirmPassword: z.string(),
  })

  .refine(
    // Функция проверки: пароли должны совпадать
    (data) => data.password === data.confirmPassword,
    {
      // Сообщение об ошибке
      message: 'Пароли не совпадают',
      // Путь к полю, где показывать ошибку
      path: ['confirmPassword'],
    },
  );

// ================================
// 3. ВЫВОД ТИПА TypeScript
// ================================

export type RegistrationFormData = z.infer<typeof registrationSchema>;