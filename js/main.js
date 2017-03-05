"use strict";
d3.queue()
	.defer(d3.json,'data/us-states-geo.json')
	.defer(d3.csv,'data/borrower_states.csv')
	.await(main);

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
function main(error, states_geo, states_borrower)
{
	var margin = 20,
		mapWidth = 900,
		legendWdith = 520,
		width = 1500,
		height = 600,
		twoPi = 2.0 * Math.PI,
		total_loans_sum = 113937.0,
		nan_count = 5515.0;

	// add title.
	d3.select('body').append('h3').attr('class','title').text('Data visualization of the borrowers at Prosper.com');
	// add some text below the title.
	d3.select('body').append('p').attr('class','info')
		.html('Prosper is America’s first marketplace lending platform,\
			 with over $8 billion in funded loans. for more information visit <a href="https://www.prosper.com/">Prosper.com</a>. <br><br> \
			 Here I visualize the number of loans per state, the state with higher number of loans has a darker color.');

	var svg = d3.select('body')
				.append('svg')
					.attr('width', '100%'  )
					.attr('height', '100%' )
	var bounding = svg.node().getBoundingClientRect();
	width = bounding.width;
	height = bounding.height;

	var map    = svg.append('g').attr('class','map');
	var legend = svg.append('g').attr('class','legend')
								.attr('transform','translate('+(width * .6)+',0)');

	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//.node().getBoundingClientRect()
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
				states_geo.features[j].id = index;
				index++;
				break;
			}
		}
	}
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// call the two function from the two files  draw_map , and draw_legend
	var color_scale = draw_map(map, mapWidth, height, states_geo);
	var arc_objects  = draw_legend(legend, legendWdith, height, states_borrower);
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

	/***************************************
	************ ANIMATION ******************
	*****************************************/
	var total = 0.0, // used by animate() to sum up loans.
		stop_exec_command = false, // a flag used to tell animate() to stop execution.
		running_flag = false; // a flag used to figure wether animate() is running or not.
	var loans_extent = d3.extent(states_borrower, function(d){ return +d.loans; }) //get maximum and minimum number of loans.
	var time_ratio = d3.scale.linear().domain(loans_extent).range([0,2]); // convert loans to range [0-2](used by setTimeout()).
	function animate(id)
	{
		// the following  will be executed if the user pressed the skip button.
		if (stop_exec_command == true )
		{
			running_flag = false;
			stop_exec_command = false;
			return;
		}
		//******************************
		//        UPDATE MAP
		//******************************
		map.select('path#path'+(id-1))
			.attr('class','states');

		map.select('path#path'+id)
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
		arc_objects[0].endAngle(twoPi *  ratio  );
		legend.select('path.total_arc')
			.attr('d',arc_objects[0]);
		arc_objects[1].endAngle( twoPi * loans/loans_extent[1] );
		legend.select('path.state_arc')
			.attr('d',arc_objects[1]);

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
		if (id == 49 ) // indicate the last element(state) .
		{
			running_flag = false;
			map.select('path#path'+(id)).attr('class','states');
		}
		//recursion
		else  setTimeout(function(){animate(id+1)},200+1000*time_ratio(loans));
	}

	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// MAKE BUTTONS [ PLAY & SKIP ]
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	  var buttonsWidth = 650,
	  	  buttonsHeight = 50;
	  var buttons = svg.append('g')
	  					.attr('class','buttons')
						.attr('transform', 'translate(' + buttonsWidth + ',' + buttonsHeight +  ')');
	//*****************************
	// first button [ skip button ]
	var skipButton = buttons.append('g').attr('class', 'skipButton');
	skipButton.append("circle")
		.attr("r", 30)
	 	.attr("transform", "translate(" + 0 + "," + 0 + ")");
 	skipButton.append("path")
	 .attr("d", "M-22,-30l60,30l-60,30z")
	 .attr("transform", "translate(" +  (-7) + "," + 0 + ") scale(.4)");
	skipButton.append("path")
		.attr("d", "M-22,-30l60,30l-60,30z")
		.attr("transform", "translate(" + 8 + "," + 0 + ") scale(.4)");
	skipButton.append('rect')
		.attr("transform", "translate(" + (-30) + "," + (-30) + ")")
		.attr('width', 60)
		.attr('height', 60)
		.on("click", function() { reanimate(true) });
	// update the tooltip.
	$('.skipButton').tipsy({
		gravity: 'w',
		html: true,
		title: function(){return 'skip'}
	});
	//**********************************
	// second button [ play button ]
	var gap = 100;
	var playButton = buttons.append('g').attr('class', 'playButton')
		.attr("transform", 'translate(' + gap + ' , 0 )' );
	playButton.append("circle")
		.attr("r", 30)
		.attr("transform", 'translate(' + 0 + ' , 0 )' );
	playButton.append("path")
	 	.attr("d", "M-22,-30l60,30l-60,30z")
	 	.attr("transform", 'translate(' +  0 + ', 0 ) scale(.4)');
	playButton.append('rect')
 		.attr("transform", "translate(" + ( -30) + "," + (-30) + ")")
 		.attr('width', 60)
 		.attr('height', 60)
 		.on("click", function() { reanimate() });
	// update the tooltip.
	 $('.playButton').tipsy({
 		gravity: 'w',
 		html: true,
 		title: function(){return 'play'}
	});
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	function to call animate() for the first time,
	//		and also when the play/skip buttons are clicked.
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	function reanimate(skip = false)
	{
		if(skip == true) // ie. user pressed skip button.
		{
			// set stop_exec_command to true so the function animate() stop it's execution.
			stop_exec_command = true;
			// restore colours and class name for the map.
			map.selectAll('path.states, path.add_map_dec')
			.attr('class', 'states')
			.style('fill',function(d)
			{
				var loans = d.properties.loans;
				return color_scale( loans );
			});
			// update the legend circle and it's text.
			arc_objects[0].endAngle(twoPi * ( 1 - ( nan_count / total_loans_sum ) )  );
			legend.select('path.total_arc')
				.attr('d',arc_objects[0]);
			var text = legend.select('.total_text');
			text.select('#percent').text(((1 - nan_count / total_loans_sum)*100).toFixed(2) + '%' );
			text.select('#loans').text( (total_loans_sum - nan_count).toLocaleString()+' Loans' );
		}
		else // first time animation or user pressed play button
		{
			// is the animation is running, send stop_exec_command signal to stop it.
			if (running_flag == true) stop_exec_command = true;
			var interval = setInterval(function(){
				if ( running_flag == false ) // wait until the animate() function stop working.
				{
					// clear all colors in the map first.
					map.selectAll('path.states, path.add_map_dec').attr('class', 'states').style('fill','white');
					total = 0; // clear the sum of loans.
					// start animation
					running_flag = true;
					animate(0);
					clearInterval(interval); // stop setInterval command
				}
			}, 500);

		}
	}
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// call for the first time .
	reanimate();
}
