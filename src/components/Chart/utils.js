export function generateNodesFromLinks(links) {
  const nodes = {};
  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    console.log('link', link.source, link.sourceDisplayName, link);
    link.source = nodes[link.source] || (nodes[link.source] = {
      id: link.source,
  		label: link.source,
      displayName: link.sourceDisplayName,
  		type: link.sourceType
  	});
    link.target = nodes[link.target] || (nodes[link.target] = {
      id: link.target,
  		label: link.target,
  		type: link.targetType
  	});

  	link.target.type = link.targetType;
  	link.source.type = link.sourceType;
  });

  return Object.values(nodes);
}
