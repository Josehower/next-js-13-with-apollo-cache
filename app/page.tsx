import { initializeApollo } from '@/util/apolloClients';
import { getUserByUsername } from '@/util/graphQL/users';
import ApolloWrapper from './ApolloWrapper';

export default async function HomePage() {
  const githubClient = initializeApollo(null);

  const profile = await getUserByUsername('prochaLu', githubClient);

  return (
    <main>
      <ApolloWrapper
        profile={profile}
        initialApolloState={JSON.stringify(githubClient.cache.extract())}
      />
    </main>
  );
}
