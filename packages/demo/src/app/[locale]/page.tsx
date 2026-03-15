'use client';

import { useTranslations } from 'next-intl';
import RegistrationForm from './components/RegistrationForm'; // ← относительный путь
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import LuxonTest from '../../components/LuxonTest';
import { Button } from 'ui';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
      <Button />
      <RegistrationForm />
      <LuxonTest />
    </main>
  );
}
