import { ADD_STOCK } from './constants';
import { Set } from 'immutable';

export default {
  stocks: (state = Set(), { type, stock }) => {
    switch (type) {
      case ADD_STOCK:
        return state.add(stock.toUpperCase())
      default:
        return state
    }
  }
}
