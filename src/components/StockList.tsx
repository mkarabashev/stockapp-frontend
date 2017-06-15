import * as React from 'react';
import { connect } from 'react-redux';

import { removeStock } from '../lib/actions';
import Stock from './Stock';

const StockList = ({ stocks, removeStock }) => (
  <section style={{margin: "20px 10px"}}>
    {stocks.map(stock =>
      <Stock key={stock} stock={stock} remove={removeStock} />
    )}
  </section>
);

const mapStateToProps = state => ({
  stocks: state.stocks
});

const mapDispatchToProps = dispatch => ({
  removeStock: symbol => dispatch(removeStock(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockList);
