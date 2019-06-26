import React from 'react';
import { Route } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      This is Home!.
    </div>
  );
};

export default {
  routes: [
    <Route key='/' path='/' render={Home} />
  ],
}
