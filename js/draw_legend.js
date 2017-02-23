//"use strict";
function draw_legend( legend_svg_g, width, height, data)
{
	var twoPi = 2 * Math.PI, // Full circle
		radius = 5,
		gap = 22,
		cx = 200,
		cy = 200,
		nan_percent = 0.0484,
		total_count_sum = 113937.0,
		nan_count = 5515.0;

	var arc = d3.svg.arc()
			.startAngle(0)
			.endAngle(twoPi * (1 - (nan_count / total_count_sum) ) )
			.innerRadius(0 + gap * radius)
			.outerRadius(20 + gap * radius);

	legend_svg_g.append("path")
			.attr("transform", "translate(" + cx + "," + cy + ") rotate(180)")
			.attr("d", arc)
			.attr('class','arc');

	// add text inside the circle
	var text = legend_svg_g.append("text")
		.attr("x", cx - 40 )
		.attr("y", cy - 20)
		.attr('class','arc_text');

	text.append('tspan')
		.text( (1-nan_percent)*100 + '%' )
		.attr('id','t1');
	text.append('tspan')
		.text( '108422 Loans' )
		.attr('x',cx - 60 )
		.attr("dy",40)
		.attr('id','t2');

	// add a  list, (some notes, under the arc)
	var notes = legend_svg_g.append('g')
					.attr('class','notes')
				.append('text')
					.attr('dx', 0)
					.attr('dy', 360);

	notes.append('tspan')
			.text("* There is a 97529 different borrowers with 113937 loans.");
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

	//****************************************************
	// ******************* ANIMATION *********************
	//debugger;
	var total = 0.0;
	/*function animate(id)
	{
		if (data[id].state != 'nan')
		{
			//calculate ratio
			var count = +data[id].count;
			total = total + count;
			var ratio = total / total_count_sum;

			// update the circle
			arc.endAngle(twoPi *  ratio  );
			legend_svg_g.select('path.arc')
				.attr('d',arc);

			// update the text
			legend_svg_g.select('tspan#t1')
				.text( (ratio*100).toFixed(2) + '%' );
			legend_svg_g.select('tspan#t2')
				.text( total.toLocaleString()+' Loans' );

		}
		//debugger;
		if ((id+1) == data.length  ){ return; }
		else { setTimeout( function(){ animate(id+1); } , 500); }

	}

	animate(0);*/
	//debugger;
return arc;

};
