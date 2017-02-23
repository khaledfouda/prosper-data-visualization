"use strict";
d3.queue()
	.defer(d3.json,'data/map/us-states-geo.json')
	.defer(d3.csv,'data/map/borrower_states.csv')
	.await(main);


function main(error, states_geo, states_borrower)
{
	var margin = 20,
		mapWidth = 900,
		legendWdith = 520,
		width = 1500,
		height = 600,
		twoPi = 2 * Math.PI,
		total_count_sum = 113937.0;

	d3.select('body').append('h2').text('Data visualization of the borrowers at Prosper.com');

	var svg = d3.select('body')
				.append('svg')
					.attr('width', width  )
					.attr('height', height )

	var map    = svg.append('g').attr('class','map');
	var legend = svg.append('g').attr('class','legend')
								.attr('transform','translate('+mapWidth+',0)');

	//  append count from states_borrower to states_geo
	// also change the variable "id" [index] for sorting, the highest count value will take [1] and the lowest would take the highest index.
	var index = 0;
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
				states_geo.features[j].id = index
				index++ ;
				break;
			}
		}
	}
	var arc_object  = draw_legend(legend, legendWdith, height, states_borrower);
	var color_scale = draw_map(map, mapWidth, height, states_geo);

	/***************************************
	************ ANIMATION ******************
	*****************************************/
	map.append('text')
			.attr("x", '600')
			.attr('y','80')
			.attr('class','state_label')
	var total = 0.0;
	function animate(id)
	{
		//debugger;
		//******************************
		//        UPDATE MAP
		//******************************
		map.select('path#path'+id+'.states')
			.style('fill',function(d)
				{
				var count = d.properties.count;
				return color_scale( count );
				});
		//*************************************
		//         UPDATE LEGEND
		//***********************************
		//calculate ratio
		var state = states_borrower[id].state,
			count = +states_borrower[id].count;
		total = total + count;
		var ratio = total / total_count_sum;

		// update the circle
		arc_object.endAngle(twoPi *  ratio  );
		legend.select('path.arc')
			.attr('d',arc_object);

		// update the text
		legend.select('tspan#t1')
			.text( (ratio*100).toFixed(2) + '%' );
		legend.select('tspan#t2')
			.text( total.toLocaleString()+' Loans' );
		//*******************************************
		//              STATE LABEL
		//********************************************
		map.select('text.state_label')
			.text(state+",  "+count+" Loans");



		//********************************
		// call the function for all the states.
		if (id == 49 ){
			map.select('text.state_label').remove();
			return;
		}
		//recursion
		else {
		 setTimeout(function(){animate(id+1)},1000);
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


