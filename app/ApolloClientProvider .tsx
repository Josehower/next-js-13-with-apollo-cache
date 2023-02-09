'use client';

import { useApollo } from '@/util/client';
import { ApolloProvider } from '@apollo/client';

type Props = {
  initialApolloState: string;
  children: React.ReactNode;
};

export default function ApolloClientProvider(props: Props) {
  const apolloClient = useApollo(JSON.parse(props.initialApolloState));
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
