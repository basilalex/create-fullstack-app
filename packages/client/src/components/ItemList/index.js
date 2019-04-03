import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Item } from '..';
import { GET_ITEMS } from './query';
import { CREATE_ITEM } from './mutation';

const { platform, product, connection } = window.navigator;
const title = `${platform} - ${product} - ${connection.effectiveType}`;

export class ItemList extends Component {

  handleQuery = ({ data, error, loading }) => {
    if (loading) {
      return 'Loading...';
    }

    if (error) {
      return `Error! ${error.message}`;
    }

    if (!loading && data.items) {
      return (
        <ul>
          {data.items.map((item, idx) => <Item key={idx} {...item} />)}
        </ul>
      );
    }

    return 'Empty :(';
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={CREATE_ITEM}
          update={(cache, { data: { createItem } }) => {
            const { items } = cache.readQuery({ query: GET_ITEMS });
            cache.writeQuery({ query: GET_ITEMS, data: { items: [ ...items, createItem ]}});
          }}>
          {(createItem, { loading }) => {
            const onClick = () => createItem({ variables: { title }});
            return <button disabled={loading} onClick={onClick}>Add</button>;
          }
        }
        </Mutation>
        <Query query={GET_ITEMS}>
          {this.handleQuery}
        </Query>
      </div>
    );
  }
}
