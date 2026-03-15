import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 1. Базовый URL (в реальном проекте берем из .env)
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// 2. Создаем инстанс Axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Интерсептор запросов (выполняется перед отправкой)
apiClient.interceptors.request.use(
  (config) => {
    // Здесь можно добавить токен авторизации
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Логируем запросы в dev-режиме
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🚀 [API Request]: ${config.method?.toUpperCase()} ${config.url}`,
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 4. Интерсептор ответов (выполняется после получения ответа)
apiClient.interceptors.response.use(
  (response) => {
    // Логируем успешные ответы
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `✅ [API Response]: ${response.status} ${response.config.url}`,
      );
    }
    return response;
  },
  (error) => {
    // Централизованная обработка ошибок
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ [API Error]:`, {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
      });
    }

    // Можно обработать разные коды ошибок
    if (error.response?.status === 401) {
      // Перенаправление на страницу логина
      // window.location.href = '/login';
      console.warn('Unauthorized! Redirect to login');
    }

    if (error.response?.status === 404) {
      console.warn('Resource not found');
    }

    // Пробрасываем ошибку дальше
    return Promise.reject(error);
  },
);

// 5. Экспортируем методы для удобства
export const api = {
  get: <T = any>(url: string, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(url, config),

  post: <T = any>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<AxiosResponse<T>> => apiClient.post<T>(url, data, config),

  put: <T = any>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<AxiosResponse<T>> => apiClient.put<T>(url, data, config),

  delete: <T = any>(url: string, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(url, config),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<AxiosResponse<T>> => apiClient.patch<T>(url, data, config),
};
