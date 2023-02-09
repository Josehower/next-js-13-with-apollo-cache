'use client';

import { useApollo } from '@/util/apolloClients';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { useState } from 'react';

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

// const client = new ApolloClient({
//   uri: 'https://api.github.com/graphql',
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: 'Bearer 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',
//   },
// });

export default function ApolloWrapper(props) {
  const apolloClient = useApollo(props.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <GitHubProfile />
    </ApolloProvider>
  );
}

function GitHubProfile() {
  const [username, setUsername] = useState('prochaLu');
  // const [currentProfile, setCurrentProfile] = useState(profile);

  const { loading, error, data, refetch } = useQuery(githubQuery, {
    variables: {
      name: 'prochaLu',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oop something went wrong</p>;

  return (
    <div>
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
