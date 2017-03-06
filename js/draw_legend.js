"use strict";
function draw_legend(legend_svg_g, data)
{
	var twoPi = 2.0 * Math.PI, // Full circle
		radius = 5,
		gap = 22,
		total_loans_sum = 108422.0;
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	first draw the two circles/arc
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var cx = 150, cy = 200;
	var arcs = legend_svg_g.append('g').attr('class','arcs')
		.attr('transform',"translate(" + cx + "," + cy + ") ");
	//********************
	//  1-  for Total loans.
	var total_arc = d3.svg.arc()
		.startAngle(0)
		.endAngle(twoPi)
		.innerRadius(0 + gap * radius)
		.outerRadius(20 + gap * radius);
	arcs.append("path")
		.attr("transform", "rotate(180)")
		.attr("d", total_arc)
		.attr('class','total_arc');
	//******************************
	// 2 -  for states.
	var state_arc = d3.svg.arc()
		.startAngle(0)
		.endAngle(twoPi * .9)
		.innerRadius((0 + gap * radius) * .8 )
		.outerRadius((20 + gap * radius) * .6);
	arcs.append("path")
		.attr("transform", "translate(250) rotate(180)")
		.attr("d", state_arc)
		.attr('class','state_arc');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	second  add text inside the circles
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// 1 -  for total loans :
	var text = arcs.append("text")
		.attr("x",  - 40)
		.attr("y",  - 50)
		.attr('class','total_text');

	text.append('tspan')
		.text('Total');
	text.append('tspan')
		.text('100%')
		.attr('id','percent')
		.attr('x', -30)
		.attr('dy', 50);
	text.append('tspan')
		.text( '108422 Loans' )
		.attr('id','loans')
		.attr('x', -60)
		.attr("dy", 40);
	//*************************
	// 2 - for states :
	var text = arcs.append('text')
		.attr("x",   200)
		.attr("y",  -20)
		.attr('class','state_text');

	text.append('tspan')
		.attr('id','state');
	text.append('tspan')
		.attr('id','percent')
		.attr('x',  215)
		.attr('dy', 40);
	text.append('tspan')
		.attr('id','loans')
		.attr('x',  195)
		.attr("dy", 30);
	// UPDATE it when mouse hover over a state.
	d3.selectAll('path.states')
		.on('mouseover', function(){
			var d       = this.__data__,
				state   = d.properties.name,
				loans   = +d.properties.loans;
			text.select('#state').text(state);
			text.select('#loans').text( loans.toLocaleString() + ' Loans');
			text.select('#percent').text((loans/total_loans_sum * 100).toFixed(2) + '%' );
			state_arc.endAngle( twoPi * loans/data[0].loans );
			legend_svg_g.select('path.state_arc').attr('d',state_arc);
		})
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	third  add some notes below the circles
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var notes = legend_svg_g.append('g')
		.attr('transform',"translate(0,360)")
		.attr('class','notes')
		.append('text');

	notes.append('tspan')
		.text("* There are 113,937 loans from 97,529 different borrowers.");
	notes.append('tspan')
		.attr('x',0)
		.attr('dy',30)
		.text('* 5,515 Loans (4.84%) of them doesn\'t include a state (NaN values).');
	notes.append('tspan')
		.attr('x',0)
		.attr('dy',30)
		.text('* Some of the borrowers made loans from more than one state,');
	notes.append('tspan')
		.attr('x',15)
		.attr('dy',20)
		.text(' so we can\'t assign a state for each borrower.');
	notes.append('tspan')
		.attr('x',0)
		.attr('dy',30)
		.text('* the length of the smaller arc is proportional to the max number of loans in a \
			state (CA).');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// return the two arc objects, will be used for animation.
	return [ total_arc, state_arc ];
};
