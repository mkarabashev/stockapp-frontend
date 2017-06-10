import { ApolloClient, createNetworkInterface } from 'react-apollo';
import * as fetch from 'isomorphic-fetch';

let apolloClient: ApolloClient | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!window) {
  (<any>global).fetch = fetch
}

function create (): ApolloClient {
  return new ApolloClient({
    ssrMode: !window, // Disables forceFetch on the server (so queries are only run once)
    networkInterface: createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
      opts: { // Additional fetch() options like `credentials` or `headers`
        credentials: 'same-origin'
      }
    })
  })
}

export default function initApollo (): ApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!window) {
    return create()
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create()
  }

  return apolloClient
}
