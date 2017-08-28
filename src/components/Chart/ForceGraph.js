import React, { Component } from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router-dom'
import { filter } from 'lodash';
import d3 from 'd3';
import { dependencyMap } from '../../getData';
import { generateNodesFromLinks } from './utils';
import './DiGraph.css';
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphArrowLink
} from 'react-vis-force';

const MULTIPLIER = 25;

class DiGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: dependencyMap,
      //nodes: [],
      height: 800,
      width: 600,
      size: 0,
      offset: 0
    }
  }
  static defaultProps = {
    data: dependencyMap
  };

  onDragStart = ({ id }) => {
    const { nodes } = this.state;

    console.log('drag')

    const updatedNodes = nodes.map((node) => {
      if (node.id !== id) {
        return node;
      }

      return { ...node, active: true };
    });

    this.setState({ nodes: updatedNodes });
  };

  onDrag = ({ id }, dragEvent) => {
    const { nodes } = this.state;
    const { x, y } = dragEvent;

    const updatedNodes = nodes.map((node) => {
      if (node.id !== id) {
        return node;
      }

      return { ...node, x, y };
    });

    this.setState({ nodes: updatedNodes });
  };

  onDragEnd = ({ id }) => {
    const { nodes } = this.state;

    const updatedNodes = nodes.map((node) => {
      if (node.id !== id) {
        return node;
      }

      return { ...node, active: false };
    });

    this.setState({ nodes: updatedNodes });
  };

  componentDidMount() {
    const nodes = generateNodesFromLinks(this.state.data);
    this.setState({ nodes: nodes });
    window.onresize = (e) => {
      console.log(e, e.target);
      this.setState({
        width: this.chartWrapper.offsetWidth,
        height: this.chartWrapper.offsetHeight
      })
    };
/*
    setTimeout(() => {
      this.setState({ nodes: filter(this.state.nodes, d => {
          console.log(d);
          return d.type !== 'nodeModule'
        })
      })
    }, 2000);*/
  }

  handleNodeSelection = (e) => {
    const id = e.target.getAttribute('data-id');
    console.log(e, e.target, id);
    this.props.history.push(`/docs#${id}`);
  }

  render() {
    const { data } = this.state;
    //const size = data.length * MULTIPLIER;
    //const offset = data.length * MULTIPLIER / 2;
    console.log(data);
    if (!this.state.nodes) return <div></div>;
    return (
      <div className="ChartWrapper" ref={chart => this.chartWrapper = chart}>
        <InteractiveForceGraph
          simulationOptions={{
            strength: {
              collide: 10,
              charge: -300
            },
            height: this.state.height,
            width: this.state.width,
            //viewBox: `0 0 ${this.state.heigh} ${this.state.width}`
          }}
          zoom
	        zoomOptions={{
            minScale: 0.5,
            maxScale: 2,
            onZoom: () => ('zoomed'),
            onPan: () => ('panned'),
            zoomSpeed: 0.05
          }}
          labelAttr="label"
          onSelectNode={this.handleNodeSelection}
          highlightDependencies={true}
          viewBox={`0 0 ${this.state.heigh} ${this.state.width}`}
        >
          {this.state.nodes.map((node, i) =>
            <ForceGraphNode
              data-id={node.id}
              key={`${node.id}-${i}`}
              label={node.id}
              node={node}
              className={`node ${node.type}`}
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
              onDrag={this.onDrag}

            />
          )}
          {data.map((link, i) =>
            <ForceGraphArrowLink
              key={`${link.source.id}=>${link.target.id}-${i}`}
              id={link.source.id}
              link={{
                ...link,
                source: link.source.id,
                target: link.target.id
              }}
              stroke="black"
            />
          )}
        </InteractiveForceGraph>
      </div>
    );
  }
}

export default withRouter(DiGraph);
