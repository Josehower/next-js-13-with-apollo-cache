import { getUserByUsername } from '@/util/graphQL/users';
import ApolloWrapper from './GitHubProfile';

export default async function HomePage() {
  const profile = await getUserByUsername('prochaLu');

  return (
    <main>
      <ApolloWrapper profile={profile} />
    </main>
  );
}
