import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import logo from '../logo.svg';
import { meta } from '../getData';

import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    setInterval(() => { this.setState({ date: new Date() }); }, 20000);
  }

  render() {
    const { project, date } = meta;
    return (
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          <span className="brand">React Visual Docs / </span>
          <span className="project-name">{project.name}</span>
          <span className="version">v{project.version}</span>
        </h1>
        <div className="time"><span>Last Updated</span> {moment(date).from(this.state.date)}</div>
      </header>
    );
  }
}

export default Header;
