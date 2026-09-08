import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
    </main>
  );
}
