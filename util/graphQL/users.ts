import { gql } from '@apollo/client';

export type GithubProfile = {
  name: string;
  bio: string;
  avatarUrl: string;
  repositories: {
    edges: {
      node: {
        name: string;
        id: string;
        url: string;
      };
    }[];
  };
};

export async function getUserByUsername(username: string, client: Client) {
  const githubProfile = await client.query<{ user: GithubProfile }>({
    query: gql`
        query profileQuery($username: String = "${username}") {
          user(login: $username) {
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
      `,
  });
  return githubProfile;
}
