import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import d3Chart from './d3Chart';

import './DiGraph.css';

class DiGraph extends Component {

  static defaultProps = {
    data: [
      { "source": "TodoItem.js", "target": "moment", "sourceType": "reactComponent", "targetType": "nodeModule" },
      { "source": "TodoItem.js", "target": "react", "sourceType": "reactComponent", "targetType": "nodeModule" },
      { "source": "TodoItem.js", "target": "Checkbox.js", "sourceType": "reactComponent", "targetType": "reactComponent" },
      { "source": "TodoList.js", "target": "react", "sourceType": "reactComponent", "targetType": "nodeModule" },
      { "source": "Checkbox.js", "target": "react", "sourceType": "reactComponent", "targetType": "nodeModule" },
      { "source": "TodoList.js", "target": "TodoItem.js", "sourceType": "reactComponent", "targetType": "reactComponent" },
      { "source": "TodoList.js", "target": "Checkbox.js", "sourceType": "reactComponent", "targetType": "reactComponent" },
      { "source": "TodoList.js", "target": "lodash", "sourceType": "reactComponent", "targetType": "nodeModule" }
    ]
  };

  openDocs(id) {
    // TODO update to receive node id on call insode d3.
    const nodes = document.getElementsByClassName('node');
    [].forEach.call(nodes, function (node) {
      node.addEventListener('dblclick', (e) => {
        console.log('e.target', e.target.attributes['node-id'].nodeValue);
      });
    });
  }

  createChart = () => {
    //alert('resize');
    const el = ReactDOM.findDOMNode(this);
    d3Chart.update(el, {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.getChartState());
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: el.offsetWidth,
      height: el.offsetHeight,
      openDocs: this.openDocs // NOTE pass in actions to be performed on events in chart
    }, this.getChartState());

    //window.addEventListener('resize', this.createChart);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.createChart);
  }

  getChartState = () => {
    return {
      links: this.props.data
    };
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}

export default DiGraph;
