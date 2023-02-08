## Setting up GraphQL with Apollo Client in Next.js

This guide will show you how to setup GraphQL with Apollo Client in a Next.js project.

### Prerequisites

- A Next.js project
- A GraphQL API endpoint to query

### GitHub Access Token

To access the GitHub GraphQL API, you will need to generate a personal access token. You can generate a personal access token by following the steps below:

1. Navigate to your [GitHub settings](https://github.com/settings/profile) and select the **Developer settings** option from the left sidebar

2. From the developer settings page, select **Personal access tokens** and then click on **Tokens (classic)**

3. Click on **Generate new token** and select **Generate new token (classic)**

4. Give your token a descriptive name, such as "GitHub API", and select the following scopes:

- `repo` (full control of private repositories)
- `user` (read/write access to profile info)

5. Click on **Generate token** to create the token

6. Save the generated token securely, as it will only be shown once. This will be your API key, which you can use to authenticate your API requests to the GitHub API

**Important**: API tokens provide full access to your GitHub account and should be treated with the same care as a password. Do not share your API key with anyone and make sure to revoke it immediately if it is compromised.

### GraphQL setup with Apollo Client

1. In your terminal, run the following command to install the necessary dependencies:

```bash
yarn add @apollo/client graphql
```

2. In your project, create a new folder named `util` and within it, create a new file named `apolloClient.ts`. Copy the following code into the file:

```typescript
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '<YOUR_GRAPHQL_API_URL>',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer <YOUR_API_KEY>`,
  },
});
```

Note: Replace `<YOUR_GRAPHQL_API_URL>` with the actual URL of your GraphQL API and `<YOUR_API_KEY>` with the API key for authentication.

3. Create a new folder named `graphql` within the `util` folder and create a new file for your queries. Import the `gql` function from `@apollo/client` and the `client` object from `apolloClient.ts` in your query file:

```typescript
import { gql } from '@apollo/client';
import { client } from '../apolloClient';
```

Then, implement a function with the GraphQL query using the following syntax:

```typescript
export async function getUser() {
  const user = await client.query({
    query: gql`
        <YOUR_QUERY>
      `,
  });
  return user;
}
```

Note: Replace `<YOUR_QUERY>` with the actual GraphQL query.

4. In your Next.js component, import the query function and assign it to a variable.

```typescript
import { users } from '<PATH_TO_YOUR_QUERY_FILE>';
```

```typescript
const users = await users();
```

5. After obtaining the user data from the query, you can render it in your component. The `users` object returned from the `getUser` function has a `data` property that contains the user data.

```typescript
<div>{users.data}</div>
```

Note: that you may need to access specific properties of the user data depending on your use case.
