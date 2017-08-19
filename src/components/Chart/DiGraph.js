import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { filter } from 'lodash';
import { dependencyMap } from '../../getData';
import d3Chart from './d3Chart';

import './DiGraph.css';

class DiGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: dependencyMap
    }
  }
  static defaultProps = {
    data: dependencyMap
  };

  onChange = ({ target }) => {
    const data = filter(this.state.data, function(o) { return o.sourceType !== 'nodeModule' && o.targetType !== 'nodeModule'; });
    this.setState({ data });
    console.log(this.state.data, data);
  };

  setRoute(d) {
    withRouter(({history}) => {
      history.push(`/docs#${d.name}`);
      alert('hello');
    })();
  }

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
    const el = this.chart;
    d3Chart.update(el, {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.getChartState());
  }

  componentDidMount() {
    const el = this.chart;
    d3Chart.create(el, {
      width: el.offsetWidth,
      height: el.offsetHeight,
      openDocs: this.openDocs // NOTE pass in actions to be performed on events in chart
    }, this.getChartState(), this.setRoute);

    //window.addEventListener('resize', this.createChart);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.createChart);
  }

  getChartState = () => {
    return {
      links: this.state.data
    };
  }

  renderControls() {
    return (
      <div>
        <input name="hideNodeModules" type="checkbox" onChange={this.onChange} value={this.state.hideNodeModules} />
        <label htmlFor="hideNodeModules">Hide Node Modules</label>
      </div>
    );
  }

  render() {
    return (
      <div className="ChartWrapper">
        {this.renderControls()}
        <div className="Chart" ref={chart => this.chart = chart}></div>
      </div>
    );
  }
}

export default DiGraph;
