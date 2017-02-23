"use strict";
function draw_map(map_svg_g, width, height, data)
{
	var projection = d3.geo.albersUsa()
							.translate([width/2, height/2])
							.scale([1300]);

	var path = d3.geo.path().projection(projection);

	function color(d)
	{
		// scale Borrower State's count to range[1-9]
		var scale_count = d3.scale.linear().domain([52,6842]).range([1,9]);

		// linear scale for the colors
		var palette = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
		var domain = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		var scale_color = d3.scale.linear().range(palette).domain(domain);

		return scale_color(scale_count(d))
	}
	// ******* BASE GROUND ********
	// draw states based on data.
	var map = map_svg_g.selectAll('path')
		.data(data.features)
		.enter()
		.append('path')
			.attr('d',path)
			.attr('class','states')
			.attr('id', function(d){ return 'path'+ d.id; })
			.style('fill',function(d)
			{
				var count = d.properties.count;
				return color( count );
			});
	// show state name and count on mouse hover . [ $ is a function in jquery.tipsy.js ]
	$('svg .map path').tipsy({
		gravity: 'w',
		html: true,
		title: function() {
			var d     = this.__data__,
				state = d.properties.name,
				count = d.properties.count;
			return state+", "+count;
		}
	});
	//**********************************
	//******** ANIMATION ***************
	//**********************************
	/*function animate(id)
	{
		map_svg_g.select('path#path'+id+'.states')
		.transition()
			.duration('500')
		.style('fill',function(d)
			{
				var count = d.properties.count;
				return color( count );
			});
		if (id == 52 ){ return; }
		//recurrsion
		else { setTimeout(function(){animate(id+1)},500); }

	};
	// clear all the colors first.
	map_svg_g.selectAll('path.states').style('fill','white');
	// call the function for the first time
	animate(0);
*/
return color
}
