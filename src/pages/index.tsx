import * as React from 'react';

import Link from '../components/Link';

interface IHomeProps extends React.Props<any> {}

const HomeComponent: React.StatelessComponent<IHomeProps> = () => (
  <div>
    Index!
    <Link href="/about"><a>About</a></Link>
  </div>
);

export default HomeComponent;
