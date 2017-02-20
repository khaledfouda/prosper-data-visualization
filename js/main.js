function main(states_geo)
{
	"use strict";
	var margin = 20,
		width = 1000 - margin,//1400 - margin,
		height = 600 - margin;//1000 - margin;

	d3.select('body').append('h2').text('Data visualization of the borrowers at Prosper.com');

	var svg = d3.select('body')
				.append('svg')
					.attr('width', width + margin  )
					.attr('height', height + margin )
					.append('g')
						.attr('class','group');

	var projection = d3.geo.albersUsa()
							.translate([width/2, height/2])
							.scale([1000]);

	var path = d3.geo.path().projection(projection);


	function add_count_to_states(states_borrower)
	{
		for (var i = 0; i < states_borrower.length; i++)
		{
			var state = states_borrower[i].state,
				count = states_borrower[i].count;

			for (var j = 0; j < states_geo.features.length; j++)
			{
				var geo_state = states_geo.features[j].properties.name;
				if (geo_state == state)
				{
					states_geo.features[j].properties.count = count;
					break;
				};
			};
		};
		// scale Borrower State's count to range[2-9] // 1 is preserver for DC
		var scale_count = d3.scale.linear().domain([52,6842]).range([1,9]);

		// linear scale for the colors
		var palette = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
		var domain = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		var color = d3.scale.linear().range(palette).domain(domain);
		//debugger;
		var map = svg.selectAll('path')
					.data(states_geo.features)
					.enter()
					.append('path')
						.attr('d',path)
						.attr('id', function(d,i){ return 'path'+i; })
						.style('fill',function(d){
							count = d.properties.count;
							return color( scale_count(count) );
						})
						.each(write_label);

		function write_label(d, i)
		{
			var text = svg.append('text')
							.attr('dx', 2)
							.attr('dy', 30);

			text.append("textPath")
				    .attr("xlink:href","#path" + i)
				    .text(d.properties.name);
		};
						debugger;
	};
	d3.csv('./data/map/borrower_states.csv', add_count_to_states);



}
//function draw_borrower_states(svg,us_states,borrower_states){

//}
