'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import LuxonTest from '../../components/LuxonTest';
import RegistrationForm from './components/RegistrationForm';
import CountriesList from '../../components/CountriesList';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px',
      }}
    >
      <LanguageSwitcher />
      <h1>{t('title')}</h1>

      <RegistrationForm />

      <div style={{ marginTop: '32px' }}>
        <LuxonTest />
      </div>

      <div style={{ marginTop: '48px' }}>
        <CountriesList />
      </div>
    </main>
  );
}