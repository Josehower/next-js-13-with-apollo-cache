## Setting up GraphQL with Apollo Client in Next.js

1. Install dependencies:

```bash
yarn add @apollo/client graphql
```

2. Create apolloClient.ts in util folder:

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

3. Implement a function with the GraphQL query using the following syntax:

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
