import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n } from '../../i18n/config';
import ApolloProvider from '../providers/ApolloProvider';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log('LocaleLayout');
  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ApolloProvider>{children}</ApolloProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
