import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Props.css';
import '../Table/Table.css';

class Props extends Component {
  static propTypes = {
    props: PropTypes.object
  };

  renderPropsTable = () => {
    const { props } = this.props;

    const rows = [];

    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        rows.push(
          <tr key={key}>
            <td className="required">{props[key].required && '*'}</td>
            <td>{key}</td>
            <td>
              <span className={`tag ${props[key].type.name}`}>{props[key].type.name}</span>
            </td>
            <td>{props[key].defaultValue ? props[key].defaultValue.value : '--'}</td>
          </tr>
        );
      }
    }

    return (
      <table className="table">
        <tbody>
          <tr>
            <th>-</th>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    const { props } = this.props;
    const propsCount = Object.keys(props).length;
    return (
      <div className="props">
        <h3>Props ({propsCount})</h3>
        {this.renderPropsTable()}
      </div>
    );
  }
}

export default Props;
