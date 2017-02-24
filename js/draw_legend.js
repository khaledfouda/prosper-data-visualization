"use strict";
function draw_legend( legend_svg_g, width, height, data)
{
	var twoPi = 2.0 * Math.PI, // Full circle
		radius = 5,
		gap = 22,
		cx = 150,
		cy = 200,
		nan_percent = 0.0484,
		total_loans_sum = 113937.0,
		nan_count = 5515.0;

		// add arc for Total loans.
	var total_arc = d3.svg.arc()
			.startAngle(0)
			.endAngle(twoPi * (1 - (nan_count / total_loans_sum) ) )
			.innerRadius(0 + gap * radius)
			.outerRadius(20 + gap * radius);

	legend_svg_g.append("path")
			.attr("transform", "translate(" + cx + "," + cy + ") rotate(180)")
			.attr("d", total_arc)
			.attr('class','total_arc');

	// add arc for states.
	var state_arc = d3.svg.arc()
	.startAngle(0)
	.endAngle(twoPi * .9)
	.innerRadius((0 + gap * radius) * .7 )
	.outerRadius((20 + gap * radius) * .65);

	legend_svg_g.append("path")
			.attr("transform", "translate(" + 400 + "," + cy + ") rotate(180)")
			.attr("d", state_arc)
			.attr('class','state_arc');

	// add text inside the circle
	// the bigger circle :
	var text = legend_svg_g.append("text")
		.attr("x", cx - 40 )
		.attr("y", cy - 50)
		.attr('class','total_text');

	text.append('tspan')
		.text('Total');
	text.append('tspan')
		.text( (1-nan_percent)*100 + '%' )
		.attr('id','percent')
		.attr('x',cx - 50)
		.attr('dy',50);
	text.append('tspan')
		.text( '108422 Loans' )
		.attr('id','loans')
		.attr('x',cx - 60 )
		.attr("dy",40);
		//*************************
		// the smaller one :
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
	//****************************************
	// add a  list, (some notes, under the arc)
	var notes = legend_svg_g.append('g')
					.attr('class','notes')
				.append('text')
					.attr('dx', 0)
					.attr('dy', 360);

	notes.append('tspan')
			.text("* There is a 97,529 different borrowers with 113,937 loans.");
	notes.append('tspan')
			.attr('x',0)
			.attr('dy',30)
			.text('* As many of them made loans from different states,');
	notes.append('tspan')
			.attr('x',20)
			.attr('dy',20)
			.text(' we will be dealing with the number of loans not number of borrowers.');
	notes.append('tspan')
			.attr('x',0)
			.attr('dy',30)
			.text('* There is a 5515(4.84%) loans which doesn\'t include a state (NaN values).');

	return [ total_arc, state_arc ];
};
