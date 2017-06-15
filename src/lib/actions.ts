import * as types from './constants';
import { ActionCreator, Action } from 'redux';

interface IStockAction extends Action {
  symbol: string
}

export const addStock: ActionCreator<IStockAction> = (symbol: string) => ({
  type: types.ADD_STOCK,
  symbol: symbol.toUpperCase()
});

export const removeStock: ActionCreator<IStockAction> = (symbol: string) => ({
  type: types.REMOVE_STOCK,
  symbol: symbol.toUpperCase()
});
