import { initializeApollo } from '@/util/client';
import { gql } from '@apollo/client';
import Animals from './Animals';
import ApolloClientProvider from './ApolloClientProvider ';

export default async function HomePage() {
  const client = initializeApollo(null);

  await client.query({
    query: gql`
      query getAnimals {
        animals {
          id
          accessory
          firstName
          type
        }
      }
    `,
  });

  return (
    <main>
      <ApolloClientProvider
        initialApolloState={JSON.stringify(client.cache.extract())}
      >
        <Animals />
      </ApolloClientProvider>
    </main>
  );
}
