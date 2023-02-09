'use client';

import { useApollo } from '@/util/apolloClients';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { useState } from 'react';

type Props = {
  initialApolloState: string;
};

const githubQuery = gql`
  query profileQuery($name: String!) {
    user(login: $name) {
      name
      bio
      avatarUrl
      repositories(last: 10) {
        edges {
          node {
            name
            id
            url
          }
        }
      }
    }
  }
`;

function GitHubProfile() {
  const [username, setUsername] = useState('');

  const { loading, error, data, refetch } = useQuery(githubQuery, {
    variables: {
      name: 'prochaLu',
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <button
          onClick={async (event) => {
            event.preventDefault();
            await refetch({ name: username });
          }}
        >
          Get Profile
        </button>
      </form>
      <h1>{data.user.name}'s Profile</h1>
      <img src={data.user.avatarUrl} alt={`${data.user.name}'s avatar`} />
      <h2>{data.user.bio}</h2>
      <h3>Repositories</h3>
      {data.user.repositories.edges.map((repository) => (
        <li key={repository.node.id}>
          <a href={repository.node.url}>{repository.node.name}</a>
        </li>
      ))}
    </div>
  );
}

export default function ApolloWrapper(props: Props) {
  const apolloClient = useApollo(JSON.parse(props.initialApolloState));
  return (
    <ApolloProvider client={apolloClient}>
      <GitHubProfile />
    </ApolloProvider>
  );
}
