import * as React from 'react';

import StockInput from '../components/StockInput';
import Chart from '../components/Chart';
import StockList from '../components/StockList';
import withData, { ICComponent } from '../lib/withData';

const HomeComponent: ICComponent = () => (
  <div className="container">
    <h1 className="title text-center text-primary">StockViewer</h1>
    <StockInput />
    <div className="clearfix" />
    <Chart />
    <StockList />
    <style jsx>{`
      .container {
        position: relative;
        width: 80%;
        max-width: 800px;
        margin-top: 50px;
      }
      .title {
        margin-bottom: 50px;
        font-size: 5em;
      }
      @media (max-width: 650px) {
        .container {
          width: 100%;
        }
      }
    `}</style>
  </div>
);

export default withData(HomeComponent);
