'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currency
    }
  }
`;

interface Country {
  code: string;
  name: string;
  emoji: string;
  capital: string | null;
  currency: string | null;
}

interface CountriesData {
  countries: Country[];
}

export default function CountriesList() {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

  if (loading) return <p>Загрузка стран...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>🌍 Страны мира</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px',
        }}
      >
        {data?.countries.slice(0, 20).map((country) => (
          <div
            key={country.code}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,.08)',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                marginBottom: '8px',
              }}
            >
              {country.emoji}
            </div>

            <h3 style={{ margin: '0 0 12px' }}>{country.name}</h3>

            <div>
              <strong>Код:</strong> {country.code}
            </div>

            <div>
              <strong>Столица:</strong> {country.capital ?? '—'}
            </div>

            <div>
              <strong>Валюта:</strong> {country.currency ?? '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
