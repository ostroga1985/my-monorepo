'use client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as Provider } from '@apollo/client/react';

// Создаем клиент Apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://spacex-production.up.railway.app/' }),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}

export default ApolloProvider;
