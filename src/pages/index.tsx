import * as React from 'react';

import StockInput from '../components/StockInput';
import Chart from '../components/Chart';
import withData, { ICComponent } from '../lib/withData';

const HomeComponent: ICComponent = () => (
  <div>
    <StockInput />
    <Chart />
  </div>
);

export default withData(HomeComponent);
