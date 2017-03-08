"use strict";

var stats = { 'population':{
	'50':{'num_of_states':9,'minimum':10146788,'sum_of_loans':56190,'sum_of_population':165145915 },
	'70':{'num_of_states':17,'minimum':6633053,'sum_of_loans':77546,'sum_of_population':226745590 },
	'90':{'num_of_states':31,'minimum':3051217,'sum_of_loans':99568,'sum_of_population':292416689 },
	'100':{'num_of_states':50,'minimum':0,'sum_of_loans':108422,'sum_of_population':322464620}
},
'loans':{
	'50':{'num_of_states':9,'minimum':3430,'sum_of_loans':57157,'sum_of_population':159412925},
	'70':{'num_of_states':16,'minimum':2318,'sum_of_loans':77342,'sum_of_population':217347892},
	'90':{'num_of_states':28,'minimum':1062,'sum_of_loans':97749,'sum_of_population':279035925},
	'100':{'num_of_states':50,'minimum':0,'sum_of_loans':108422,'sum_of_population':322464620}
},
'score':{
	'50':{'num_of_states':18,'minimum':.5,'sum_of_loans':77491,'sum_of_population':208943858},
	'70':{'num_of_states':3,'minimum':.7,'sum_of_loans':25646,'sum_of_population':62361927 },
	'90':{'num_of_states':1,'minimum':.9,'sum_of_loans':14717,'sum_of_population':39250017 },
	'100':{'num_of_states':50,'minimum':0,'sum_of_loans':108422,'sum_of_population':322464620}
}};

function draw_legend()
{
	var total_loans_sum = 108422.0;
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//	what's the fuck going here !!
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var cx = 150, cy = 200;
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	//      ***DRAW BORDERS***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// horizontal top
	legend.append('line').attr({ x1:"-30", y1:"5", x2:"600", y2:"5"});
	// horizontal bottom
	legend.append('line').attr({ x1:"-30", y1:"300", x2:"600", y2:"300"});
	// vertical left
	legend.append('line').attr({ x1:"-30", y1:"5", x2:"-30", y2:"300"});
	// vertical right
	legend.append('line').attr({ x1:"600", y1:"5", x2:"600", y2:"300"});
	// vertical middle left
	legend.append('line').attr({ x1:"160", y1:"5", x2:"160", y2:"300"});
	// vertical middle right
	legend.append('line').attr({ x1:"340", y1:"5", x2:"340", y2:"300"});
	// horizontal to split buttons
	legend.append('line').attr({ x1:"340", y1:"140", x2:"600", y2:"140"});
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** draw buttons [[ right side ]] ***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	var buttons = legend.append('g').attr('class','buttons')
		.attr('transform',"translate(" + 400 + "," + 15 + ") ");
	// buttons is divied to [ type buttons [upper], percentage Buttons [lower] ].
	var typeButtons = buttons.append('g').attr('class','typeButtons')
		.attr('transform',"translate(" + 0 + "," + 0 + ") ");
	var percentageButtons = buttons.append('g').attr('class','percentageButtons')
		.attr('transform',"translate(" + 0 + "," + 135 + ") ");

	var types = ['loans', 'population', 'score'];
	var percents = [ 50, 70, 90, 100 ];
	typeButtons.selectAll('rect')
		.data(types).enter()
		.append('rect')
			.attr('class', 'rect')
			.attr('id',function(d){ return d; })
			.attr('x',-30)
			.attr('width', 15)
			.attr('height', 15)
			.on("click", function(d)
			{
				typeButton_clicked(d, this)
			})
			.each(function(d)
			{
				if(d == 'loans') var y = 30;
				else if(d == 'population') var y = 60;
				else if(d == 'score') var y = 90;
				d3.select(this).attr('y', y);
			});
	typeButtons.selectAll('text')
		.data(types).enter()
		.append('text')
			.attr('class','text')
			.attr('x',0)
			.each(function(d)
			{
				if(d == 'loans') var y = 30 + 12;
				else if(d == 'population') var y = 60 + 12;
				else if(d == 'score') var y = 90 + 12;
				d3.select(this).attr('y',y).text(d);
			});
	typeButtons.append('text').text('Color the map by :').attr({'x':-50, 'y':15 });
	//----------------------
	percentageButtons.selectAll('rect')
		.data(percents).enter()
		.append('rect')
			.attr('class', 'rect')
			.attr('id',function(d){ return 'b'+d; })
			.attr('x',-30)
			.attr('width', 15)
			.attr('height', 15)
			.on("click", function(d)
			{
				percentageButton_clicked(d);
			})
			.each(function(d)
			{
				if(d == 50) var y = 30;
				else if(d == 70) var y = 60;
				else if(d == 90) var y = 90;
				else if(d == 100) var y = 120;
				d3.select(this).attr('y', y);
			});
	percentageButtons.selectAll('text')
		.data(percents).enter()
		.append('text')
			.attr('class','text')
			.attr('x',0)
			.each(function(d)
			{
				if(d == 50) var y = 30 + 12;
				else if(d == 70) var y = 60 + 12;
				else if(d == 90) var y = 90 + 12;
				else if(d == 100) var y = 120 + 12;
				d3.select(this).attr('y',y).text(d+'%');
			})
	percentageButtons.append('text').text('Show ...% of the data :').attr({'x':-50, 'y':15 });
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** draw state info [[ middle ]] ***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	var state_info = legend.append('g').attr('class','state_info')
		.attr('transform',"translate(" + 180 + "," + 15 + ") ")
		.append('text');
	state_info.append('tspan')
		.attr('id','name')
		.attr({ 'x':12, 'dy':20 })
		.text('State-name');
	state_info.append('tspan')
		.attr('id','loans')
		.attr({ 'x':0, 'dy':40 })
		.text('Loans : '+1556);
	state_info.append('tspan')
		.attr('id','percentage')
		.attr({ 'x':0, 'dy':30 })
		.text('percentage: '+.78);
	state_info.append('tspan')
		.attr('id','population')
		.attr({ 'x':0, 'dy':30 })
		.text('Population: '+2222222);
	state_info.append('tspan')
		.attr('id','score')
		.attr({ 'x':0, 'dy':30 })
		.text('Score: '+.8);
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** draw summary part [[ left ]] ***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	var summary = legend.append('g').attr('class','summary')
		.attr('transform',"translate(" + -20 + "," + 15 + ") ")
		.append('text');
	summary.append('tspan')
		.attr('id','states')
		.attr({ 'x':0, 'dy':20 })
		.text("number of states: ",50);
	summary.append('tspan')
		.attr('id','loans')
		.attr({ 'x':0, 'dy':40 })
		.text('sum of loans: '+1556);
	summary.append('tspan')
		.attr('id','population')
		.attr({ 'x':0, 'dy':30 })
		.text('sum of population : '+1556);
	summary.append('tspan')
		.attr('id','total_states')
		.attr({ 'x':0, 'dy':30 })
		.text('total number of states: '+ 50);
	summary.append('tspan')
		.attr('id','total_loans')
		.attr({ 'x':0, 'dy':30 })
		.text('total number of loans: '+.8);
	summary.append('tspan')
		.attr('id','total_population')
		.attr({ 'x':0, 'dy':30 })
		.text('total population: '+.8);

	//*************************************************
};
function typeButton_clicked(type)
{
	d3.select('.typeButtons .rect.clicked').attr('class','rect');
	d3.select('.typeButtons .rect#'+type).attr('class','rect clicked');
	percentageButton_clicked("100");
}
function percentageButton_clicked(percent)
{
	d3.select('.percentageButtons .rect.clicked').attr('class','rect');
	d3.select('.percentageButtons .rect#b'+percent ).attr('class','rect clicked');

	var type = d3.select('.legend .typeButtons .rect.clicked')[0][0].__data__;

	draw_map(type);
	d3.selectAll('.map .states').each(function(d)
	{
		if( d.properties[type] < stats[type][percent]['minimum'] )
			d3.select(this).style('fill','white').attr('class','states hide');
	});
	show_tooltip();
	update_summary(type, percent);
}
function update_summary(type, percent)
{
	summary = d3.select('.legend .summary text');

}
