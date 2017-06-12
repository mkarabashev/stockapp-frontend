import * as React from 'react';
import { Set } from 'immutable';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import * as randomHexColor from 'random-hex-color';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const toChartData = stocks => {
  let chartData = [];

  for (let stock of stocks) {
    for (let i = 0; i < stock.history.length; i++) {
      const { date, close } = stock.history[i];
      if (chartData.length <= i) chartData[i] = { name: date }
      chartData[i][stock.symbol] = close;
    }
  }

  return chartData.reverse();
}

const Chart = ({ data }: { data?: any }) => {
  let chartData = [];
  let lines;

  if (!data.loading && data.stocks.length > 0) {
    chartData = toChartData(data.stocks);

    lines = Object.keys(chartData[0]).slice(1).map(stockName =>
      <Line key={stockName} type="monotone"
        dataKey={stockName} stroke={randomHexColor()} dot={false} />
    );
  }

  return (
    <LineChart width={700} height={400} data={chartData}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      {lines}
    </LineChart>
  )
};

const stocks = gql`
  query Stock($symbols: [String]) {
    stocks(symbols: $symbols) {
      symbol
      history {
        date
        close
      }
    }
  }
`;

const ChartWithData = graphql(stocks, {
  options: (props: { stocks: Set<any>}) => ({
    variables: {
      symbols: props.stocks.toJS()
    }
  })
})(Chart);

const mapStateToProps = state => ({
  stocks: state.stocks
})

export default connect(mapStateToProps)(ChartWithData);
