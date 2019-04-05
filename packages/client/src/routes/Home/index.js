import React, { PureComponent } from 'react';
import { ItemsCard } from '../../components';

class Home extends PureComponent {

  render () {
    return (
      <div>
        This is Home!.
        <ItemsCard />
      </div>
    );
  }
}

export default {
  render: routeProps => <Home />,
  path: '/',
  exact: false
}
