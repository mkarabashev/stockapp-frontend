import * as React from 'react';

import Home from './index';

export default () => (
  <div>
    About us
    <Home test='test'>
      <div>child</div>
      <div>another div</div>
      a string
    </Home>
  </div>
);
