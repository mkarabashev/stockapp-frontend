import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { ApolloClient } from 'react-apollo';
import {
  Store,
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';

import reducers from './reducers';

let reduxStore: Store<{}> | null = null;

const composeEnhancers = composeWithDevTools({});

function create (apollo: ApolloClient, initialState = {}): Store<any> {
  return createStore(
    combineReducers({ // Setup reducers
      ...reducers,
      apollo: apollo.reducer()
    }),
    initialState, // Hydrate the store with server-side data
    composeEnhancers(
      applyMiddleware(apollo.middleware()), // Add additional middleware here
    )
  )
}

export default function initRedux (
  apollo: ApolloClient,
  initialState?: {}
): Store<any> {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!window) {
    return create(apollo, initialState)
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(apollo, initialState)
  }

  return reduxStore
}
