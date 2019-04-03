import React, { PureComponent } from 'react';
import { ItemList } from '../components';

class Home extends PureComponent {

  render () {
    return (
      <div>
        This is Home!.

        <ItemList />
      </div>
    );
  }
}

export default {
  render: routeProps => <Home />,
  path: '/',
  exact: false
}
