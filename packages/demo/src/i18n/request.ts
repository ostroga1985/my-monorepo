import { getRequestConfig } from 'next-intl/server';
import { i18n } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Проверяем, что locale есть
  let locale = await requestLocale;
  console.log(
    'requestLocalerequestLocalerequestLocalerequestLocalerequestLocalerequestLocale',
    requestLocale,
  );

  if (!locale) {
    console.error('Locale is undefined!');
    locale = i18n.defaultLocale; // fallback
  }

  console.log('Loading messages for locale:', locale);

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    locale,
  };
});
