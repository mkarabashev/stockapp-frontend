import * as React from 'react';
import * as withRedux from 'next-redux-wrapper';
import * as redux from 'redux'

import Link from '../components/Link';
import { addCount, initStore, IReduxState, IAction } from '../store';

interface IParentProps extends React.Props<any> {
  test: string;
}

interface IHomeProps extends IParentProps {
  count: string;
  add(): void;
}

interface IMapState {
  (state: IReduxState): ({
    count: number
  })
}

interface IMapDispatch {
  (dispatch: redux.Dispatch<IAction>): {
    add(): void
  }
}

const HomeComponent: React.StatelessComponent<IHomeProps> = (
  { children, count, add, test }) => (
  <div>
    Index!
    <Link href="/about"><a>About{children}</a></Link>
  </div>
);

const mapStateToProps: IMapState = (state) => ({
  count: state.count
})

const mapDispatchToProps: IMapDispatch = (dispatch) => ({
  add: () => dispatch(addCount())
})

const Home: React.StatelessComponent<IParentProps> = withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default Home;
