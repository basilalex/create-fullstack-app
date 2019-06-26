import React, { Component } from 'react';
import { Item } from '..';

export class ItemList extends Component {
  componentDidMount() {
    const { subscribeToNewItems } = this.props;
    return subscribeToNewItems && subscribeToNewItems();
  }

  render() {
    const { data, error, loading } = this.props;
    return (
      <ul>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {!loading && data && data.items && data.items.map((item, idx) => <Item key={idx} {...item} />)}
      </ul>
    );
  }
}
