import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { meta } from '../getData';

import '../css/Header.css';

class Header extends Component {
  static propTypes = {
    children: PropTypes.any
  };
  render() {
    return (
      <header className="header">
        <h1>
          <span className="brand">React Visual Docs / </span>
          <span className="project-name">{meta.project.name}</span>
        </h1>
      </header>
    );
  }
}

export default Header;
