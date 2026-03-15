import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { i18n } from './i18n/config'; // ← путь изменен! (убрал ../)

// Оборачиваем стандартный middleware в функцию с логированием
const intlMiddleware = createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  console.log('🔍 [Middleware] Запрос к URL:', request.url);
  console.log('🔍 [Middleware] Pathname:', request.nextUrl.pathname);
  console.log('🔍 [Middleware] Доступные языки:', i18n.locales);

  // Вызываем стандартный middleware next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

