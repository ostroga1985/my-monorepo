import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n/config';
import { NextRequest } from 'next/server';

// Функция теперь должна называться proxy (или быть export default)
export function proxy(request: NextRequest) {
  console.log('🔍 [Proxy] Запрос к URL:', request.url);
  console.log('🔍 [Proxy] Pathname:', request.nextUrl.pathname);
  console.log('🔍 [Proxy] Доступные языки:', i18n.locales);

  // Создаём middleware из next-intl
  const intlMiddleware = createMiddleware({
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    localePrefix: 'always',
  });

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
