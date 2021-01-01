"use strict";
// initialize some public variables shared between js scripts.
var margin = 20,
map_width = 900,
legend_margin = map_width + 50,
width = 1700,
height = 600,
footer_height = 250,
sum_of_loans = 108422.0,
map,
legend,
states_geo,
states_csv;
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
d3.queue()
	.defer(d3.json,'data/us-states-geo.json')
	.defer(d3.csv,'data/borrower_states.csv')
	.await(main);
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
function main(error, geo, csv)
{
	states_geo = geo;
	states_csv = csv;
	// add title.
	d3.select('body').append('h3').attr('class','title')
		.text('Data visualization of the borrowers at Prosper.com');
	// add some text below the title.
	d3.select('body').append('p').attr('class','info')
		.html('Prosper is America’s first marketplace lending platform,\
			with over $8 billion in funded loans. for more information visit \
			<a href="https://www.prosper.com/">Prosper.com</a>.\
			<br>Based on the published loan data,\
			 I extracted the number of loans made from each state.\
			<br>Here I visualize the number of loans, population and score per state,\
			the state with higher value has a darker color.\
			<br>Each state has a score between 0 and 1, and it\'s evaluated as a\
			 function of two variables: population and loans.\
			<br>States with high score have both high number of loans and population\
			 which make them worth paying attention to.\
			<br>As shown in the map below, the three states: California, Illinois, and Georgia have score higher than 0.7,\
			 moreover, 18 states have score higher than 0.5.\
			<br>Code can be found on github.com/khaledfouda/prosper-data-visualization');
	var svg = d3.select('body')
		.append('svg')
			.attr('xmlns',"http://www.w3.org/2000/svg")
			.attr('xmlns:xlink', "http://www.w3.org/1999/xlink")
			.attr('width', width + 'px')
			.attr('height', (height+footer_height) + 'px');
	map    = svg.append('g').attr('class','map');
	legend = svg.append('g').attr('class','legend')
		.attr('transform','translate('+ legend_margin +',100)');

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
	// initialize visualization as it's click on type:loans and 100% percentage.
	typeButton_clicked('loans');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** footer section ***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var footer = svg.append('g').attr('class','footer')
		.attr('transform','translate(0,'+ (height+30) +')');

	//footer.append('line').attr({ x1:"30", y1:"0", x2:"1500", y2:"0"});

	//footer.append('text').attr({'x':30,'y':35 })
	//	.text('Code can be found in this github');

	//footer.append('a').attr('xlink:href',"https://github.com/khaledfouda/prosper-data-visualization")
	//	.append('text').attr({'x':60,'y':35 }).text(' repository.');

	footer.append('line').attr({ x1:"30", y1:"40", x2:"1500", y2:"40"});
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

}
