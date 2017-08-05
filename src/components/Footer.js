import React, { Component, PropTypes } from 'react';

import { meta } from '../getData';

import '../css/Footer.css';

class Header extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  renderFileStats = () => {
    const stats = meta.project.stats.files.map((file) => {
      return (<li className="stat-item" key={file.type}>{file.count} {file.label}</li>);
    });
    return <ul className="file-stats">{stats}</ul>;
  }
  render() {
    return (
      <footer className="footer">
        {this.renderFileStats()}
      </footer>
    );
  }
}

export default Header;
