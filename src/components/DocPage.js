import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Props from './Props';
import { docs } from '../getData';

import '../css/DocPage.css';

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
    console.log(docs, this.props);
    console.log(this.props.location.hash);
    this.setState({
      doc: docs[this.props.location.hash.slice(1)]
    });
  }

  render() {
    console.log('state', this.state);
    const { filePath, moduleType, props } = this.state.doc;
    return (
      <div className="doc-page">
        <div className="title-block">
          <h2 className="title">{filePath}</h2>
          <h3 className="module-type">{moduleType}</h3>
        </div>
        {props && <Props props={props} />}
      </div>
    );
  }
}

export default DocPage;
