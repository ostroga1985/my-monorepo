import { api } from './api';

// Типы данных
export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
  };
};

export type CreateUserDto = {
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

// Тип ответа для пагинации
export type UsersResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
};

// Методы для работы с пользователями
export const usersApi = {
  // Получить всех пользователей
  getAll: () => api.get<User[]>('/users'),

  // Получить с пагинацией
  getPaginated: (page: number, limit: number) =>
    api.get<UsersResponse>(`/users?_page=${page}&_limit=${limit}`),

  // Получить одного пользователя
  getById: (id: number) => api.get<User>(`/users/${id}`),

  // Создать нового пользователя
  create: (userData: CreateUserDto) => api.post<User>('/users', userData),

  // Обновить пользователя
  update: (id: number, userData: Partial<CreateUserDto>) =>
    api.put<User>(`/users/${id}`, userData),

  // Удалить пользователя
  delete: (id: number) => api.delete<void>(`/users/${id}`),

  // Получить посты пользователя
  getPosts: (userId: number) => api.get(`/users/${userId}/posts`),
};
