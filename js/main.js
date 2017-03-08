"use strict";
d3.queue()
	.defer(d3.json,'data/us-states-geo.json')
	.defer(d3.csv,'data/annualIncome2.csv')
	.await(main);

var margin = 20,
	map_width = 900,
	legend_margin = map_width + 50,
	width = 1700,
	height = 600,
	twoPi = 2.0 * Math.PI,
	sum_of_loans = 108422.0,
	sum_of_populations = 322464620,
	map,
	legend,
	states_geo,
	states_csv;
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
function main(error, geo, csv)
{
	states_geo = geo;
	states_csv = csv;
	// add title.
	d3.select('body').append('h3').attr('class','title').text('Data visualization of the borrowers at Prosper.com');
	// add some text below the title.
	d3.select('body').append('p').attr('class','info')
		.html('Prosper is America’s first marketplace lending platform,\
			with over $8 billion in funded loans. for more information visit <a\
			href="https://www.prosper.com/">Prosper.com</a>. <br><br> \
			Here I visualize the number of loans per state, the state with higher number of loans\
			has a darker color.');

	var svg = d3.select('body')
		.append('svg')
			.attr('width', width + 'px')
			.attr('height', height + 'px');

	 map    = svg.append('g').attr('class','map');
	 legend = svg.append('g').attr('class','legend')
		.attr('transform','translate('+ legend_margin +',0)');

	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//  append count from states_borrower to states_geo
	// also change the variable "id" [index] for sorting,
	//	  the highest count value will take [1] and the lowest would take the highest index.
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// reset id variable in states.geo.features
	for (var j = 0; j < states_geo.features.length; j++)
	{
		states_geo.features[j].id = -1;
	}
	var index = 0;
	for (var i = 0; i < states_csv.length; i++)
	{
		var state   = states_csv[i].state,
			loans   = +states_csv[i].loans,
			population = +states_csv[i].population,
			score = +states_csv[i].score;
		for (var j = 0; j < states_geo.features.length; j++)
		{
			var geo_state = states_geo.features[j].properties.name;
			if (geo_state == state)
			{
				states_geo.features[j].properties.loans = loans;
				states_geo.features[j].properties.population = population;
				states_geo.features[j].properties.score = score;
				states_geo.features[j].id = index;
				index++;
				break;
			}
		}
	}
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// call the two function from the two files  draw_map , and draw_legend
	draw_map('population');
	show_tooltip();
	draw_legend();
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

}
