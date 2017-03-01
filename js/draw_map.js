"use strict";
function draw_map(map_svg_g, width, height, data)
{
	// convert map co-ordinates into pixels.
	var projection = d3.geo.albersUsa()
							.translate([width/2, height/2])
							.scale([1300]);
	// draw the map
	var path = d3.geo.path().projection(projection);
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// this function takes a state loans and return a color for it.( the more loans states have the darker color it gets).
	function color(d)
	{
		// scale Borrower State's count to range[1-9]
		var scale_loans = d3.scale.linear().domain([52,6842]).range([1,9]);
		// color range
		var palette = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
		var domain = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		// linear scale for the colors
		var scale_color = d3.scale.linear().range(palette).domain(domain);

		return scale_color(scale_loans(d))
	}
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// ******* BASE GROUND ********
	// draw states based on data.
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var map = map_svg_g.selectAll('path')
		.data(data.features)
		.enter()
		.append('path')
			.attr('d',path)
			.attr('class','states')
			.attr('id', function(d){ return 'path'+ d.id; })
			.style('fill',function(d)
			{
				var loans = d.properties.loans;
				return color( loans );
			});
	// show state name and count on mouse hover .[ tipsy - tooltip ]
	$('svg .map path').tipsy({
		gravity: 'w',
		html: true,
		title: function() {
			var d     = this.__data__,
				state = d.properties.name,
				loans = +d.properties.loans;
			return state+"  "+ loans.toLocaleString()+ ' Loans';
		}
	});
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//return color() function to  main(), will be used for animation.
	return color
}
