import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Item } from '..';
import { GET_ITEMS } from './query';

export class ItemList extends Component {

  handleQuery = ({ data, error, loading }) => {
    if (loading) {
      return 'Loading...';
    }

    if (error) {
      return `Error! ${error.message}`;
    }

    if (!loading && data.items) {
      return data.items.map((item, idx) => <Item key={idx} {...item} />);
    }

    return 'Empty :(';
  }

  render() {
    return (
      <div>
        <Query query={GET_ITEMS}>
          {this.handleQuery}
        </Query>
      </div>
    );
  }
}
