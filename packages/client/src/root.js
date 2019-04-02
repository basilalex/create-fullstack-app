import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch } from 'react-router-dom';

class Root extends PureComponent {
  render() {
    const { apolloClient, history, routes } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Router history={history}>
          <Switch>
            {routes}
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export const renderApp = appCtx => {
  const { apolloClient, history, routes } = appCtx;

  const app = ReactDOM.render(
    <Root apolloClient={apolloClient} history={history} routes={routes} />,
    document.getElementById('root')
  );

  return { ...appCtx, app };
};
