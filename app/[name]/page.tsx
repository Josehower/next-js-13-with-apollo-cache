import { getUserByUsername } from '@/util/graphQL/users';
import React from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    [key: string]: string;
  };
};

export default async function ProfilePage(props: Props) {
  if (!props.params.name) {
    throw new Error('No username provided!');
  }

  const githubProfile = await getUserByUsername(props.params.name);

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
