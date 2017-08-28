// NOTE this is an unused component. It is here for reference when implemeting
// the newer ForceGraph.js component.

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { filter } from 'lodash';
import d3 from 'd3';
import { dependencyMap } from '../../getData';
import d3Chart from './d3Chart';
import { generateNodesFromLinks } from './utils';
import './DiGraph.css';

const MULTIPLIER = 25;

function linkArc(d) {
  console.log('d', d);
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  console.log('transform', d, d.x, d.y);
  return `translate(${d.x},${d.y})`; //"translate(" + d.x + "," + d.y + ")";
}

class DiGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: dependencyMap,
      size: 0,
      offset: 0
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
    const el = this.chartWrapper;
    d3Chart.update(el, {
      width: el.offsetWidth*2,
      height: el.offsetHeight
    }, this.getChartState());
  }

  componentDidMount() {
    const el = this.chart;
    const wrapper = this.chartWrapper;
    const { data } = this.props;
    const size = data.length * MULTIPLIER;
    const offsetW = (size - this.chartWrapper.offsetWidth) / 2;
    const offsetH = (size - this.chartWrapper.offsetWidth) / 2;
    this.chartWrapper.scrollTop = offsetH;
    this.chartWrapper.scrollLeft = offsetW;
    //console.log(offset)

    d3Chart.create(el, {
      width: Math.max(size, wrapper.offsetWidth),
      height: Math.max(size, wrapper.offsetHeight),
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

  tick() {
    //path.attr("d", linkArc);
    //circle.attr("transform", transform);
    //text.attr("transform", transform);
  }

  renderMarkers = () => {
    const markers = ['nodeModule', 'reactComponent', 'pureJS'];
    const attributes = {
      viewBox: '0 -5 10 10',
      refX: 25,
      refY: -1,
      markerWidth: 6,
      markerHeight: 6,
      orient: 'auto'
    };
    return markers.map((m, i) => (
      <marker key={i} id={m} {...attributes}>
        <path d="M0,-5L10,0L0,5"></path>
      </marker>
    ))
  }

  renderPaths = () => {
    const { data } = this.props;
    console.log('data', data);
    return data.map((d) =>
      <path className="link" markerEnd="url(#reactComponent)" d={linkArc(d)}></path>
    )
  }

  renderCircles = (nodes) => {
    let nodesHTML = [];
    for (let key in nodes) {
      if (nodes.hasOwnProperty(key)){
        console.log('circle node', nodes[key]);
        nodesHTML.push(<cricle
          className={`node`}
          r="5"
          data-node-id="12345"
          transform={transform(nodes[key])}
          ></cricle>);
      }
    }
    return nodesHTML;
  }

  renderLabels = (nodes) => {
    let nodesHTML = [];
    for (let key in nodes) {
      if (nodes.hasOwnProperty(key)){
        console.log('label node', nodes[key]);
        nodesHTML.push(
          <text
            x="8"
            y="0.31em"
            transform={transform(nodes[key])}
          >
            {nodes[key].name}
          </text>);
      }
    }
    return nodesHTML;
  }

  force = ({ nodes, links, width, height }) =>
    d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(150)
      .charge(-1000)
      .on("tick", this.tick)
    //  .start();

  render() {
    const { data } = this.props;
    const size = data.length * MULTIPLIER;
    const offset = data.length * MULTIPLIER / 2;

    const { links, nodes } = generateNodesFromLinks(data);
    const forceLayout = this.force(nodes, links, size, size);
    console.log('NODES', nodes, data);
    return (
      <div className="ChartWrapper" ref={chart => this.chartWrapper = chart}>
        <div
          className="Chart"
          ref={chart => this.chart = chart}
          scrollTop={offset}
          scrollLeft={offset}
          style={{
            height: size,
            width: size,
            minHeight: '100%',
            minWidth: '100%'
          }}
          >
            <svg height={size} width={size}>
              <defs>
                {this.renderMarkers()}
              </defs>
              <g id="paths">
                {this.renderPaths(links)}
              </g>
              <g id="circles">
                {this.renderCircles(nodes)}
              </g>
              <g id="text">
                {this.renderLabels(nodes)}
              </g>
            </svg>
          </div>
      </div>
    );
  }
}

export default DiGraph;
