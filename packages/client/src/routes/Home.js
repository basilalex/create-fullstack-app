import React, { PureComponent } from 'react';

class Home extends PureComponent {

  render () {
    return (
      <div>
        This is Home!.
      </div>
    );
  }
}

export default {
  render: routeProps => <Home />,
  path: '/',
  exact: false
}
