import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <button className="button">
        {this.props.children}
      </button>
    );
  }
}

export default Button;
