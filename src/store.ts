import { createStore, applyMiddleware, compose } from 'redux'
import  * as redux from 'redux';

export interface IReduxState {
  lastUpdate: number;
  light: boolean;
  count: number;
};

interface IActionTypes {
  ADD: string;
};

export interface IAction {
  type: string;
  [key: string]: any;
};

const exampleInitialState: IReduxState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const actionTypes: IActionTypes = {
  ADD: 'ADD'
}

// REDUCERS
export const reducer = (
  state: IReduxState = exampleInitialState,
  action: IAction
): IReduxState => {
  switch (action.type) {
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    default: return state
  }
}

// ACTIONS
export const addCount = (): IAction => ({ type: actionTypes.ADD })

export interface IStore {
  (initialState: IReduxState): redux.Store<IReduxState>
}

export const initStore: IStore = (initialState = exampleInitialState) => {
  const windowIfDefined = typeof window === 'undefined' ? {} : window as any;
  const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reducer, initialState, composeEnhancers())
}
