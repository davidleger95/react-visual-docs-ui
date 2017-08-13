import d3 from 'd3';

function generateNodesFromLinks(links) {
  const nodes = {};
  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    console.log('link', link.source, link.sourceDisplayName, link);
    link.source = nodes[link.source] || (nodes[link.source] = {
  		name: link.source,
      displayName: link.sourceDisplayName,
  		type: link.sourceType
  	});
    link.target = nodes[link.target] || (nodes[link.target] = {
  		name: link.target,
  		type: link.targetType
  	});

  	link.target.type = link.targetType;
  	link.source.type = link.sourceType;
  });

  return nodes;
}

const d3Chart = {};

d3Chart.create = function (element, props, state) {
  const nodes = generateNodesFromLinks(state.links);
  var svg = d3.select(element)
              .append("svg")
                .attr({
                  width: props.width,
                  height: props.height
                });

  // Per-type markers, as they don't inherit styles.
  svg.append("defs").selectAll("marker")
      .data(["nodeModule", "reactComponent"])
    .enter().append("marker")
      .attr({
        id: d => d,
        viewBox: '0 -5 10 10',
        refX: 25,
        refY: -1,
        markerWidth: 6,
        markerHeight: 6,
        orient: 'auto'
      })
    .append("path")
      .attr("d", "M0,-5L10,0L0,5");
  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(state.links)
      .size([props.width, props.height])
      .linkDistance(150)
      .charge(-1000)
      .on("tick", tick)
      .start();
  var path = svg.append("g").selectAll("path")
      .data(force.links())
      .enter().append("path")
        .attr({
          class: 'link',
          'marker-end': d => "url(#reactComponent)"
        });

  var circle = svg.append("g").selectAll("circle")
      .data(force.nodes())
  		//.data(["nodeModule", "reactComponent"])
    .enter().append("circle")
      .attr({
        r: 5,
        'node-id': '12345',
        class: d => `node ${d.type}`
      })
      .call(force.drag);

  var text = svg.append("g").selectAll("text")
      .data(force.nodes())
    .enter().append("text")
      .text(d => {
        console.log(d);
        return d.name;
      })
      .attr({ x: 8, y: '0.31em' });

  function tick() {
    path.attr("d", linkArc);
    circle.attr("transform", transform);
    text.attr("transform", transform);
  }

  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }

  //this.update(element, state);
};

d3Chart.update = function (element, props, state) {
  const nodes = generateNodesFromLinks(state.links);
  var svg = d3.select(element)
              .append("svg")
                .attr({
                  width: props.width,
                  height: props.height
                });

  // Per-type markers, as they don't inherit styles.
  svg.append("defs").selectAll("marker")
      .data(["nodeModule", "reactComponent"])
    .enter().append("marker")
      .attr({
        id: d => d,
        viewBox: '0 -5 10 10',
        refX: 25,
        refY: -1,
        markerWidth: 6,
        markerHeight: 6,
        orient: 'auto'
      })
    .append("path")
      .attr("d", "M0,-5L10,0L0,5");
  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(state.links)
      .size([props.width, props.height])
      .linkDistance(150)
      .charge(-1000)
      .on("tick", tick)
      .start();
  var path = svg.append("g").selectAll("path")
      .data(force.links())
      .enter().append("path")
        .attr({
          class: 'link',
          'marker-end': d => "url(#reactComponent)"
        });

  var circle = svg.append("g").selectAll("circle")
      .data(force.nodes())
  		//.data(["nodeModule", "reactComponent"])
    .enter().append("circle")
      .attr({
        r: 5,
        'node-id': '12345',
        class: d => `node ${d.type}`
      })
      .call(force.drag);

  var text = svg.append("g").selectAll("text")
      .data(force.nodes())
    .enter().append("text")
      .text(d => d.name)
      .attr({ x: 8, y: '0.31em' });

  function tick() {
    path.attr("d", linkArc);
    circle.attr("transform", transform);
    text.attr("transform", transform);
  }

  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }
};

d3Chart.destroy = function (element) {
  // unmount
};

//============================================


export default d3Chart;
