import { getUser } from '@/util/graphQL/users';

export default async function HomePage() {
  const githubProfile = await getUser();
  return (
    <main>
      <h1>{githubProfile.data.user.name}'s Profile</h1>
      <img
        src={githubProfile.data.user.avatarUrl}
        alt={`${githubProfile.data.user.name}'s avatar`}
      />
      <h2>{githubProfile.data.user.bio}</h2>
      <h3>Repositories</h3>
      {githubProfile.data.user.repositories.edges.map((repository) => (
        <li key={repository.node.id}>
          <a href={repository.node.url}>{repository.node.name}</a>
        </li>
      ))}
    </main>
  );
}
