import * as React from 'react';

import Link from '../components/Link';
import withData, { ICComponent } from '../lib/withData';

const HomeComponent: ICComponent = () => (
  <div>
    Index!
    <Link href="/about"><a>About</a></Link>
  </div>
);

export default withData(HomeComponent);
