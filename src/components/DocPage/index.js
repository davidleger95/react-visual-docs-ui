import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Props from '../Props';
import Methods from '../Methods';
import Dependencies from '../Dependencies';
import { docs } from '../../getData';

import EmptyState from './EmptyState';
import FileList from './FileList';
import './DocPage.css';

class DocPage extends Component {
  static propTypes = {
    location: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      doc: {},
      isOpen: true
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
    const currentDoc = docs[path] || {}

    this.setState({ doc: currentDoc });

    if (true) {  // NOTE only for testing
      const paths = Object.keys(docs);
      this.setState({ paths });
    }
  }



  handleBackClick() {
    this.setState({ filePath: undefined })
  }

  renderDocs() {
    const {
      filePath, moduleType, props,
      methods, dependencies, dependants
    } = this.state.doc;

    if (!docs.hasOwnProperty(filePath))
      return (
        <EmptyState
          missingFile={this.props.location.hash.slice(1)}
          availableFiles={this.state.paths}
        />
      );

      console.log('props', props);

    return (
      <div>
        <Link className="all-files-link" to="docs">All Files</Link>
        <hr className="nav-divider" />
        <div className="title-block">
          <h2 className="title">{filePath}</h2>
          <h3 className={`module-type ${moduleType}`}>{moduleType}</h3>
        </div>
        {props && <Props props={props} />}
        {methods && methods.length > 0 && <Methods data={methods} />}
        {dependencies &&
        <Dependencies
          dependencies={dependencies}
          dependants={dependants}
          availableFiles={this.state.paths}
        />}
      </div>
    );
  }

  renderHome() {
    return (
      <div>
        <h2>Files in your Project ({this.state.paths.length})</h2>
        <FileList paths={this.state.paths} />
      </div>
    );
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div className="doc-page-wrapper" data-open={this.state.isOpen}>
        <button className="doc-page-btn" onClick={this.toggleOpen}></button>
        <div className="doc-page">
          {this.props.location.hash ? this.renderDocs() : this.renderHome()}
        </div>
      </div>
    );
  }
}

export default DocPage;
