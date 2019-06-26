import React, { PureComponent } from 'react';

export class Item extends PureComponent {

  render() {
    const { id, title } = this.props;
    return (
      <li>
        <span>{id}</span>
        <span> -- </span>
        <span>{title}</span>
      </li>
    );
  }
}
