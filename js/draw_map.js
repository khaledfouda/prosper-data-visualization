function draw_map(map_svg_g, width, height, data)
{
	var projection = d3.geo.albersUsa()
							.translate([width/2, height/2])
							.scale([1300]);

	var path = d3.geo.path().projection(projection);

	// scale Borrower State's count to range[2-9] // 1 is preserver for DC
	var scale_count = d3.scale.linear().domain([52,6842]).range([1,9]);

	// linear scale for the colors
	var palette = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
	var domain = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	var color = d3.scale.linear().range(palette).domain(domain);

	var map_svg_g_path = map_svg_g.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
					.attr('d',path)
					.attr('class','states')
					.attr('id', function(d,i){ return 'path'+i; })
					.style('fill',function(d){
						count = d.properties.count;
						return color( scale_count(count) );
					})

	$('svg .map .states').tipsy({
		gravity: 'w',
		html: true,
		title: function() {
			var d     = this.__data__,
				state = d.properties.name,
				count = d.properties.count;
			return state+", "+count;
		}
	});

	return map_svg_g_path
}
