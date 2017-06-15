import { ADD_STOCK, REMOVE_STOCK } from './constants';
import { Set } from 'immutable';

export default {
  stocks: (state = Set([ 'AAPL', 'NVDA' ]), { type, symbol }) => {
    switch (type) {
      case ADD_STOCK:
        return state.add(symbol)
      case REMOVE_STOCK:
        return state.delete(symbol)
      default:
        return state
    }
  }
}
