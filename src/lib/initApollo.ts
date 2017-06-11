import { ApolloClient, createNetworkInterface } from 'react-apollo';
import * as fetch from 'isomorphic-fetch';

import { isServer } from './utils';

let apolloClient: ApolloClient | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (isServer()) {
  (<any>global).fetch = fetch
}

function create (): ApolloClient {
  return new ApolloClient({
    ssrMode: isServer(), // Disables forceFetch on the server (so queries are only run once)
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:8080', // Server URL (must be absolute)
      opts: { // Additional fetch() options like `credentials` or `headers`
      }
    })
  })
}

export default function initApollo (): ApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return create()
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create()
  }

  return apolloClient
}
