"use strict";
function draw_legend( legend_svg_g, width, height, data)
{
	var twoPi = 2.0 * Math.PI, // Full circle
		radius = 5,
		gap = 22,
		cx = 150,
		cy = 200,
		total_loans_sum = 113937.0,
		nan_count = 5515.0;
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	first draw the two circles/arc
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//  1-  for Total loans.
	var total_arc = d3.svg.arc()
			.startAngle(0)
			.endAngle(twoPi * (1 - (nan_count / total_loans_sum) ) )
			.innerRadius(0 + gap * radius)
			.outerRadius(20 + gap * radius);
	legend_svg_g.append("path")
			.attr("transform", "translate(" + cx + "," + cy + ") rotate(180)")
			.attr("d", total_arc)
			.attr('class','total_arc');
	//******************************
	// 2 -  for states.
	var state_arc = d3.svg.arc()
		.startAngle(0)
		.endAngle(twoPi * .9)
		.innerRadius((0 + gap * radius) * .7 )
		.outerRadius((20 + gap * radius) * .65);
	legend_svg_g.append("path")
			.attr("transform", "translate(" + 400 + "," + cy + ") rotate(180)")
			.attr("d", state_arc)
			.attr('class','state_arc');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	second  add text inside the circles
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// 1 -  for total loans :
	var text = legend_svg_g.append("text")
		.attr("x", cx - 40 )
		.attr("y", cy - 50)
		.attr('class','total_text');

	text.append('tspan')
		.text('Total');
	text.append('tspan')
		.text( (1 - (nan_count / total_loans_sum))*100 + '%' )
		.attr('id','percent')
		.attr('x',cx - 50)
		.attr('dy',50);
	text.append('tspan')
		.text( '108422 Loans' )
		.attr('id','loans')
		.attr('x',cx - 60 )
		.attr("dy",40);
	//*************************
	// 2 - for states :
	var text = legend_svg_g.append('text')
		.attr("x", cx + 200 )
		.attr("y", cy - 20)
		.attr('class','state_text');

	text.append('tspan')
			.attr('id','state');
	text.append('tspan')
			.attr('id','percent')
			.attr('x', cx + 215)
			.attr('dy',40);
	text.append('tspan')
			.attr('id','loans')
			.attr('x',cx + 195 )
			.attr("dy",30);
	// UPDATE it when mouse hover over a state.
	d3.selectAll('path.states')
		.on('mouseover', function(){
			var d     = this.__data__,
				state   = d.properties.name,
				loans   = +d.properties.loans;
			text.select('#state').text(state);
			text.select('#loans').text( loans.toLocaleString() + ' Loans');
			text.select('#percent').text((loans/total_loans_sum * 100).toFixed(2) + '%' );
			state_arc.endAngle( twoPi * loans/data[0].loans );
			legend_svg_g.select('path.state_arc')
				.attr('d',state_arc);
		})
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	third  add some notes below the circles
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var notes = legend_svg_g.append('g')
					.attr('class','notes')
				.append('text')
					.attr('dx', -5)
					.attr('dy', 360);

	notes.append('tspan')
			.text('* The rest 4.84%(5,515 Loans) doesn\'t include a state (NaN values). ')
			.text();
	notes.append('tspan')
			.attr('x',-5)
			.attr('dy',30)
			.text("* There are 113,937 loans from 97,529 different borrowers.")
	notes.append('tspan')
			.attr('x',-5)
			.attr('dy',30)
			.text('* Some of the borrowers made loans from more than one state,');
	notes.append('tspan')
			.attr('x',15)
			.attr('dy',20)
			.text(' so we can\'t assign a state for each borrower.');
	notes.append('tspan')
			.attr('x',-5)
			.attr('dy',30)
			.text('* the length of the smaller arc is proportional to the max number of loans in a state (CA). ');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// return the two arc objects, will be used for animation.
	return [ total_arc, state_arc ];
};
