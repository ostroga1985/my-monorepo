import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n } from '../../i18n/config';
import ApolloProvider from '../providers/ApolloProvider';

// Правильный тип для Next.js 16 в продакшене
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ВАЖНО: именно Promise!
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ждём locale
  const { locale } = await params;

  console.log('LocaleLayout with locale:', locale);

  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ApolloProvider>{children}</ApolloProvider>
    </NextIntlClientProvider>
  );
}
