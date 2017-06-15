import * as React from 'react';
import { Set } from 'immutable';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import * as randomHexColor from 'random-hex-color';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
}

const toChartData = stocks => {
  let chartData = [];

  for (let stock of stocks) {
    for (let i = 0; i < stock.history.length; i++) {
      const { date, close } = stock.history[i];
      if (chartData.length <= i) chartData[i] = { name: formatDate(date) }
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
        dataKey={stockName} stroke={randomHexColor({ luminocity: 'dark'})} dot={false} />
    );
  }

  return (
    <ResponsiveContainer aspect={2}>
      <LineChart data={chartData} margin={{ right: 70 }}>
        <XAxis dataKey="name" minTickGap={30} tick={{ transform: "translate(0, 6)" }}/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        {lines}
      </LineChart>
    </ResponsiveContainer>
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
