"use strict";
var type;
function draw_map(variable)
{
	type = variable;
	// convert map co-ordinates into pixels.
	var projection = d3.geo.albersUsa()
		.translate([map_width/2, height/2])
		.scale([1250]);
	// draw the map
	var path = d3.geo.path().projection(projection);
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// this function takes a state loans and return a color for it.
	//	( the more loans states have the darker color it gets).
	function color(d,type)
	{
		if (type == 'loans') domain = [52,6842];
		else if (type == 'population') domain = [585501, 27862596];
		else if (type == 'score') domain = [0.07607, 0.76444];
		else return 0
		// scale Borrower State's count to range[1-9]
		var scale_loans = d3.scale.linear().domain(domain).range([1,9]);
		// color range
		var palette = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4',
			'#1d91c0','#225ea8','#253494','#081d58'];
		var domain = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		// linear scale for the colors
		var scale_color = d3.scale.linear().range(palette).domain(domain);

		return scale_color(scale_loans(d))
	}
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// ******* Magic ********
	// draw states based on data.
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// delete the map incase if it exists.
	map.selectAll('path').remove();
	map.selectAll('path')
		.data(states_geo.features)
		.enter()
		.append('path')
			.attr('d',path)
			.attr('class','states show')
			.attr('id', function(d){ return 'path'+ d.id; })
			.style('fill',function(d)
			{
				var loans = d.properties.loans,
					population = d.properties.population,
					score = d.properties.score;
				if (loans == 0) return '#fff'; // for states that has 0 loans.
				if(type == 'loans') return color( loans, 'loans' );
				else if(type == 'population') return color( population, 'population' );
				else if(type == 'score') return color( score, 'score' );
				else return;
				return color( population, 'population' );
			});
}
function show_tooltip()
{
	// show state name and count on mouse hover .[ tipsy - tooltip ]
	$('svg .map .states.show').tipsy({
		gravity: 'w',
		html: true,
		title: function()
		{
			var d = this.__data__,
				state = d.properties.name,
				loans = d.properties.loans,
				population = d.properties.population,
				score = d.properties.score;
			if(type == 'loans')
				var value = loans;
			else if(type == 'population')
				var value = population;
			else if(type == 'score')
				var value = score;
			else return;
			return state+"  ["+type+": "+value.toLocaleString()+" ] ";
		}
	});
}
