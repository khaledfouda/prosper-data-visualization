d3.queue()
	.defer(d3.json,'data/map/us-states-geo.json')
	.defer(d3.csv,'data/map/borrower_states.csv')
	.await(main);


function main(error, states_geo, states_borrower)
{
	"use strict";
	var margin = 20,
		mapWidth = 900,
		mapHeight = 600,
		width = 1500,
		height = 600;

	d3.select('body').append('h2').text('Data visualization of the borrowers at Prosper.com');

	var svg = d3.select('body')
				.append('svg')
					.attr('width', width  )
					.attr('height', height )

	var map    = svg.append('g').attr('class','map');
	var legend = svg.append('g').attr('class','legend')
								.attr('transform','translate('+mapWidth+',0)');

	//  append count from states_borrower to states_geo
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
			}
		}
	}
	var map = draw_map(map, mapWidth, mapHeight, states_geo)
	var legend = draw_legend(legend)

}


/*
**********************************************************
These projects helped me alot,

http://bl.ocks.org/ilyabo/1373263
http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

http://codepen.io/anon/pen/NqWQNg
*********************************************************

*/


