function createD3Tree(div, data) {
	if(Ext.isEmpty(data)) return ;
	//m[1] 纵坐标向下
	//m[2] 
	//m[3] 纵坐标向上
	//m[4] 横坐标
	var m = [5, 120, 5, 250], w = 900 - m[1] - m[3], h = 600 - m[0] - m[2], i = 0, root;

	var tree = d3.layout.tree().size([h, w]);

	var diagonal = d3.svg.diagonal().projection(function(d) {
				return [d.y, d.x];
			});
	//	清空内容
	d3.select("#" + div).html('');
	
	var vis = d3.select("#" + div).append("svg:svg").attr("width",
			w + m[1] + m[3]).attr("height", h + m[0] + m[2]).append("svg:g")
			.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	initData(data);

	function initData(json) {
		root = json;
		root.x0 = h / 2;
		root.y0 = 0;

		function toggleAll(d) {
			if (d.children) {
				d.children.forEach(toggleAll);
				toggle(d);
			}
		}

		// Initialize the display to show a few nodes.
		root.children.forEach(toggleAll);

		update(root);
	}

	function update(source) {
		var duration = d3.event && d3.event.altKey ? 5000 : 500;

		// Compute the new tree layout.
		var nodes = tree.nodes(root).reverse();

		// Normalize for fixed-depth.
		nodes.forEach(function(d) {
					d.y = (d.depth * 450) + 30; //控制节点间距离
				});

		// Update the nodes…
		var node = vis.selectAll("g.node").data(nodes, function(d) {
					return d.id || (d.id = ++i);
				});

		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("svg:g").attr("class", "node")
				.attr("transform", function(d) {
							return "translate(" + source.y0 + "," + source.x0
									+ ")";
						}).on("click", function(d) {
							toggle(d);
							update(d);
						});

		nodeEnter.append("svg:circle").attr("r", 1e-6).style("fill",
				function(d) {
					return d._children ? "lightsteelblue" : "#fff";
				});

		nodeEnter.append("svg:text").attr("x", function(d) {
					return d.children || d._children ? -10 : 10;
				}).attr("dy", ".35em").attr(
				"text-anchor", function(d) {
					return d.children || d._children ? "end" : "start";
				}).text(function(d) {
					if(d)
						return d.name +"  总域名数：" + Main.fun.nvl (d.ymszj,0) + "("+ "内:" + Main.fun.nvl(d.wn,0) + "/内外:" + Main.fun.nvl(d.wnww,0) + "/外:" + Main.fun.nvl(d.ww,0) +")" ;
					else
						return '';
				}).style("fill-opacity", 1e-6);

//		nodeEnter.append("svg:text").attr("x", function(d) {
//					return d.children || d._children ? -10 : 10;
//				}).attr("fill", "#15428B").attr("dy", "2em").attr(
//				"text-anchor", function(d) {
//					return d.children || d._children ? "end" : "start";
//				}).text(function(d) {
//					if(d)
//						return "总域名数：" + Main.fun.nvl (d.ymszj,0) + "("+ "内:" + Main.fun.nvl(d.wn,0) + "/内外:" + Main.fun.nvl(d.wnww,0) + "/外:" + Main.fun.nvl(d.ww,0) +")";
//					else 
//						return '';
//				}).style("fill-opacity", 1);
//				
//		nodeEnter.append("svg:text").attr("x", function(d) {
//					return d.children || d._children ? 20 : 10;
//				}).attr("fill", "#15428B").attr("dy", "4em").attr(
//				"text-anchor", function(d) {
//					return d.children || d._children ? "end" : "start";
//				}).text(function(d) {
//					if(d)
//						return "内:" + Main.fun.nvl(d.wn,0) + "/内外:" + Main.fun.nvl(d.wnww,0) + "/外:" + Main.fun.nvl(d.ww,0);
//					else
//						return "";
//				}).style("fill-opacity", 1);

		// Transition nodes to their new position.
		var nodeUpdate = node.transition().duration(duration).attr("transform",
				function(d) {
					return "translate(" + d.y + "," + d.x + ")";
				});

		nodeUpdate.select("circle").attr("r", 4.5).style("fill", function(d) {
					return d._children ? "lightsteelblue" : "#fff";
				});

		nodeUpdate.select("text").style("fill-opacity", 1);

		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition().duration(duration).attr(
				"transform", function(d) {
					return "translate(" + source.y + "," + source.x + ")";
				}).remove();

		nodeExit.select("circle").attr("r", 1e-6);

		nodeExit.select("text").style("fill-opacity", 1e-6);

		// Update the links…
		var link = vis.selectAll("path.link").data(tree.links(nodes),
				function(d) {
					return d.target.id;
				});

		// Enter any new links at the parent's previous position.
		link.enter().insert("svg:path", "g").attr("class", "link").attr("d",
				function(d) {
					var o = {
						x : source.x0,
						y : source.y0
					};
					return diagonal({
								source : o,
								target : o
							});
				}).transition().duration(duration).attr("d", diagonal);

		// Transition links to their new position.
		link.transition().duration(duration).attr("d", diagonal);

		// Transition exiting nodes to the parent's new position.
		link.exit().transition().duration(duration).attr("d", function(d) {
					var o = {
						x : source.x,
						y : source.y
					};
					return diagonal({
								source : o,
								target : o
							});
				}).remove();

		// Stash the old positions for transition.
		nodes.forEach(function(d) {
					d.x0 = d.x;
					d.y0 = d.y;
				});
	}

	// Toggle children.

	function toggle(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
	}
}