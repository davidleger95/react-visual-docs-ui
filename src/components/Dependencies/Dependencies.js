import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { includes } from 'lodash';

import './Dependencies.css';
import '../Table/Table.css';

class Dependencies extends Component {
  static displayName = 'Dependencies';
  static propTypes = {
    dependencies: PropTypes.object.isRequired,
    dependants: PropTypes.object.isRequired,
    availableFiles: PropTypes.array.isRequired
  };

  exists = (path) => {
    console.log(includes(this.props.availableFiles, path), path, this.props.availableFiles);
    return includes(this.props.availableFiles, path);
  }

  renderTable = (data) => {

    const rows = data.map((item, key) => {
      return (
        <tr className={item.moduleType}>
          <td>{item.name}</td>
          <td>
            <Link to={`/docs#${item.path}`} className={this.exists(item.path) ? '' : 'disabled'}>
              {item.moduleType === 'nodeModule' && 'node_modules/'}
              {item.path}
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Path</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    console.log(this.props);
    const { dependencies, dependants } = this.props;
    return (
      <div className="props">
        {dependencies.length ?
        <div>
          <h3>Dependencies ({dependencies.length})</h3>
          {this.renderTable(dependencies)}
        </div> : null}
        {dependants.length ?
        <div>
          <h3>Dependants ({dependants.length})</h3>
          {this.renderTable(dependants)}
        </div> : null}
      </div>
    );
  }
}

export default Dependencies;
