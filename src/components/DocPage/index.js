import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Props from '../Props';
import Methods from '../Methods';
import Dependencies from '../Dependencies';
import { docs } from '../../getData';

import './DocPage.css';

class DocPage extends Component {
  static propTypes = {
    location: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      doc: {}
    };
  }

  componentWillMount() {
    const path = this.props.location.hash.slice(1);
    this.updateDocs(path);
  }

  componentWillReceiveProps(nextProps) {
    const path = this.props.location.hash.slice(1);
    const nextPath = nextProps.location.hash.slice(1);
    if (path !== nextPath) {
      this.updateDocs(nextPath);
    }
  }

  updateDocs(path) {
    const currentDoc = docs[path]
    if (currentDoc) {
      this.setState({ ...currentDoc });
    }  if (true) {  // NOTE only for testing
      const paths = Object.keys(docs);
      this.setState({ paths });
    }
  }

  renderFilesList() {
    return this.state.paths.map((path, key) => {
      return (
        <li key={key}>
          <Link to={`/docs#${path}`}>{path}</Link>
        </li>
      );
    })
  }

  renderEmptyState() {
    return (
      <div className="empty-state">
        <h2>Error</h2>
        <p>File <code>'{this.props.location.hash.slice(1)}'</code> does not exist.</p>
        <hr />
        <h3>Availible Files</h3>
        <ul>
          {this.renderFilesList()}
        </ul>
      </div>
    );
  }

  renderDocs() {
    const { filePath, moduleType, props, methods, dependencies, dependants } = this.state;
    console.log(this.state);
    return (
      <div>
        <div className="title-block">
          <h2 className="title">{filePath}</h2>
          <h3 className="module-type">{moduleType}</h3>
        </div>
        {props && <Props props={props} />}
        {methods && <Methods data={methods} />}
        {dependencies && <Dependencies dependencies={dependencies} dependants={dependants} />}
      </div>
    );
  }

  render() {
    return (
      <div className="doc-page">
        {this.state.filePath ? this.renderDocs() : this.renderEmptyState()}
        {this.renderEmptyState()}
      </div>
    );
  }
}

export default DocPage;
