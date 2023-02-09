'use client';
import { gql, useQuery } from '@apollo/client';

const getAnimals = gql`
  query getAnimals {
    animals {
      id
      accessory
      firstName
      type
    }
  }
`;

export default function Animals() {
  const { loading, error, data, refetch } = useQuery(getAnimals);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <div>
      {JSON.stringify(data)}
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}
