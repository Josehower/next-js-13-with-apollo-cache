import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';

// GraphQL schema
const typeDefs = gql`
  type Query {
    # Query all animals
    animals: [Animal]
  }

  # Animal type definition
  type Animal {
    id: ID!
    firstName: String
    type: String
    accessory: String
  }
`;

// Create Resolvers
const resolvers = {
  Query: {
    //  resolver for the animals query
    animals: () => {
      return [{ id: 1, firstName: 'dodo', type: 'turtle', accessory: 'hat' }];
    },
  },
};

// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create the Apollo server
const server = new ApolloServer({
  schema,
});

// Start the server and create a Next.js handler
export default startServerAndCreateNextHandler(server);
