import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Methods.css';
import '../Table/Table.css';

class Methods extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  renderPropsTable = () => {
    const { data } = this.props;

    const rows = data.map((method, key) => {
      return (
        <tr key={key}>
          <td>{method.name}</td>
          <td>
            <span className={`tag ${method.returns === null && 'null'}`}>{`${method.returns}`}</span>
          </td>
          <td>{method.params.length ? method.params.map(i => `${i.name}: ${i.type}`) : '--'}</td>
        </tr>
      );
    });

    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Params</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <div className="props">
        <h3>Methods ({data.length})</h3>
        {this.renderPropsTable()}
      </div>
    );
  }
}

export default Methods;
