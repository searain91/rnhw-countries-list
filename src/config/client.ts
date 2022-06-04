import ApolloClient from 'apollo-boost';
// initialize a GraphQL client
export const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
});
