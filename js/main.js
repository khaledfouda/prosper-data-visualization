"use strict";
d3.queue()
	.defer(d3.json,'data/us-states-geo.json')
	.defer(d3.csv,'data/borrower_states.csv')
	.await(main);


function main(error, states_geo, states_borrower)
{
	var margin = 20,
		mapWidth = 900,
		legendWdith = 520,
		width = 1500,
		height = 600,
		twoPi = 2.0 * Math.PI,
		total_loans_sum = 113937.0;

	d3.select('body').append('h3').attr('class','title').text('Data visualization of the borrowers at Prosper.com');
	d3.select('body').append('p').attr('class','info')
			.html('Prosper is America’s first marketplace lending platform,\
			 with over $8 billion in funded loans. for more information visit <a href="https://www.prosper.com/">Prosper.com</a>. <br><br> \
	Here I visualize the number of loans per state, the state with higher number of loans has a darker color.');

	var svg = d3.select('body')
				.append('svg')
					.attr('width', '100%'  )
					.attr('height', '100%' )

	var map    = svg.append('g').attr('class','map');
	var legend = svg.append('g').attr('class','legend')
								.attr('transform','translate('+mapWidth+',0)');

	//  append count from states_borrower to states_geo
	// also change the variable "id" [index] for sorting, the highest count value will take [1] and the lowest would take the highest index.
	var index = 0;
	for (var i = 0; i < states_borrower.length; i++)
	{
		var state = states_borrower[i].state,
				loans = states_borrower[i].loans;
		for (var j = 0; j < states_geo.features.length; j++)
		{
			var geo_state = states_geo.features[j].properties.name;
			if (geo_state == state)
			{
				states_geo.features[j].properties.loans = loans;
				states_geo.features[j].id = index
				index++ ;
				break;
			}
		}
	}
	var color_scale = draw_map(map, mapWidth, height, states_geo);
	var arc_objects  = draw_legend(legend, legendWdith, height, states_borrower);

	/***************************************
	************ ANIMATION ******************
	*****************************************/
	var total = 0.0;
	var loans_extent = d3.extent(states_borrower, function(d){ return +d.loans; })
	var time_ratio = d3.scale.linear().domain(loans_extent).range([0,2]);
	function animate(id)
	{
		//debugger;
		//******************************
		//        UPDATE MAP
		//******************************
		map.select('path#path'+(id-1))
			.attr('class','states');

		map.select('path#path'+id+'.states')
			.attr('class','add_map_dec')
			.style('fill',function(d)
				{
				var loans = d.properties.loans;
				return color_scale( loans );
				});
		//*************************************
		//         UPDATE LEGEND
		//***********************************
		//calculate ratio
		var state = states_borrower[id].state,
				loans = +states_borrower[id].loans;
		total = total + loans;
		var ratio = total / total_loans_sum;

		// update the circle
		//debugger;
		arc_objects[0].endAngle(twoPi *  ratio  );
		legend.select('path.total_arc')
			.attr('d',arc_objects[0]);
		arc_objects[1].endAngle( twoPi * loans/loans_extent[1] );
		legend.select('path.state_arc')
			.attr('d',arc_objects[1])

		// update the text
		var text = legend.select('.total_text');
		text.select('#percent').text( (ratio*100).toFixed(2) + '%' );
		text.select('#loans').text( total.toLocaleString()+' Loans' );
		var text = legend.select('.state_text');
		text.select('#state').text(state);
		text.select('#percent').text( (loans/total_loans_sum * 100).toFixed(2) + '%' );
		text.select('#loans').text(loans.toLocaleString() + ' Loans');
		//*******************************************
		//********************************
		// call the function for all the states.
		if (id == 49 ){
			map.select('path#path'+(id))
				.attr('class','states');
			return;
		}
		//recursion
		else {
		 setTimeout(function(){animate(id+1)},200+1000*time_ratio(loans));
		 debugger;
		}

	}
	// clear all colors in the map first.
	map.selectAll('path.states').style('fill','white');
	// start animation
	animate(0);
}






/*
**********************************************************
These projects helped me alot,

http://bl.ocks.org/ilyabo/1373263
http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

http://codepen.io/anon/pen/NqWQNg
*********************************************************

*/
