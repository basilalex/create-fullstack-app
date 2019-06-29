import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { apolloClient, history } from '../global';
import { createStore, combineReducers, compose } from 'redux';

const Root = ({ store, routes }) => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <Switch>
          {routes}
        </Switch>
      </Router>
    </ApolloProvider>
  </Provider>
);

export const createApp = ({ reducers, routes }) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    combineReducers(reducers),
    composeEnhancers()
  );

  return ReactDOM.render(
    <Root routes={routes} store={store} />,
    document.getElementById('root')
  );
};
