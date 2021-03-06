import * as React from 'react';
import { ApolloProvider, getDataFromTree, ApolloClient } from 'react-apollo';

import initApollo from './initApollo';
import initRedux from './initRedux';
import { Store } from 'redux';
import { isServer } from './utils';

export interface IWithDataState {};

export interface IWithDataProps {
  serverState: object
};

export interface ICComponentProps {
  url?: {
    query: string,
    pathname: string
  }
};

export interface ICComponent extends React.StatelessComponent<ICComponentProps> {
  getInitialProps?(arg: any): {
    [key: string]: any
  }
};

export type TWithData = (ComposedComponent: ICComponent) =>
  React.ComponentClass<IWithDataProps>;

const withData: TWithData = (ComposedComponent) => {
  return class WithData extends React.Component<IWithDataProps, IWithDataState> {
    apollo: ApolloClient
    redux: Store<any>

    static displayName = `WithData(${ComposedComponent.displayName})`

    static async getInitialProps (ctx) {
      let serverState = {};

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (isServer()) {
        const apollo = initApollo();
        const redux = initRedux(apollo);
        // Provide the `url` prop data in case a graphql query uses it
        const url = {query: ctx.query, pathname: ctx.pathname};

        // Run all graphql queries
        const app: React.ReactElement<any> = (
          // No need to use the Redux Provider
          // because Apollo sets up the store for us
          <ApolloProvider client={apollo} store={redux}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );

        await getDataFromTree(app);

        // Extract query data from the store
        const state = redux.getState();

        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState = {
          apollo: { // Make sure to only include Apollo's data state
            data: state.apollo.data
          }
        };
      }

      return {
        serverState,
        ...composedInitialProps
      };
    }

    constructor (props: IWithDataProps) {
      super(props);
      this.apollo = initApollo();
      this.redux = initRedux(this.apollo, this.props.serverState);
    }

    render () {
      return (
        // No need to use the Redux Provider
        // because Apollo sets up the store for us
        <ApolloProvider client={this.apollo} store={this.redux}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
}

export default withData;
