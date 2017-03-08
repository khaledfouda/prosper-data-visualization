"use strict";

var stats = {
'population':{
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
	legend.append('line').attr({ x1:"-30", y1:"5", x2:"700", y2:"5"});
	// horizontal bottom
	legend.append('line').attr({ x1:"-30", y1:"300", x2:"700", y2:"300"});
	// vertical left
	legend.append('line').attr({ x1:"-30", y1:"5", x2:"-30", y2:"300"});
	// vertical right
	legend.append('line').attr({ x1:"700", y1:"5", x2:"700", y2:"300"});
	// vertical middle left
	legend.append('line').attr({ x1:"260", y1:"5", x2:"260", y2:"300"});
	// vertical middle right
	legend.append('line').attr({ x1:"470", y1:"5", x2:"470", y2:"300"});
	// horizontal to split buttons
	legend.append('line').attr({ x1:"470", y1:"140", x2:"700", y2:"140"});
	// horizontal to split summary1
	legend.append('line').attr({ x1:"-30", y1:"50", x2:"260", y2:"50"});
	// horizontal to split summary2
	legend.append('line').attr({ x1:"-30", y1:"170", x2:"260", y2:"170"});
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** draw buttons [[ right side ]] ***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	var buttons = legend.append('g').attr('class','buttons')
		.attr('transform',"translate(" + 540 + "," + 15 + ") ");
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
		.attr('transform',"translate(" + 275 + "," + 15 + ") ")
		.append('text');
	state_info.append('tspan')
		.attr('id','name')
		.attr({ 'x':30, 'dy':20 })
		.text('State-name');
	state_info.append('tspan')
		.attr('id','loans')
		.attr({ 'x':0, 'dy':40 })
		.text('Loans : ');
	state_info.append('tspan')
		.attr('id','percentage')
		.attr({ 'x':0, 'dy':30 })
		.text('percentage: ');
	state_info.append('tspan')
		.attr('id','population')
		.attr({ 'x':0, 'dy':30 })
		.text('Population: ');
	state_info.append('tspan')
		.attr('id','score')
		.attr({ 'x':0, 'dy':30 })
		.text('Score: ');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** draw summary part [[ left ]] ***
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	var summary = legend.append('g').attr('class','summary')
		.attr('transform',"translate(" + -20 + "," + 15 + ") ")
		.append('text');
	summary.append('tspan')
		.attr({ 'x':90, 'dy':15 })
		.text('summary');
	summary.append('tspan')
		.attr('id','states')
		.attr({ 'x':0, 'dy':50 })
		.text("number of states: " + stats.loans['100']['num_of_states'].toLocaleString());
	summary.append('tspan')
		.attr('id','loans')
		.attr({ 'x':0, 'dy':30 })
		.text('sum of loans: ' + stats.loans['100']['sum_of_loans'].toLocaleString());
	summary.append('tspan')
		.attr('id','population')
		.attr({ 'x':0, 'dy':30 })
		.text('sum of population : ' + stats.loans['100']['sum_of_population'].toLocaleString());
	summary.append('tspan')
		.attr('id','total_states')
		.attr({ 'x':0, 'dy':70 })
		.text('total number of states: ' + stats.loans['100']['num_of_states'].toLocaleString());
	summary.append('tspan')
		.attr('id','total_loans')
		.attr({ 'x':0, 'dy':30 })
		.text('total number of loans: ' + stats.loans['100']['sum_of_loans'].toLocaleString());
	summary.append('tspan')
		.attr('id','total_population')
		.attr({ 'x':0, 'dy':30 })
		.text('total population: ' + stats.loans['100']['sum_of_population'].toLocaleString());
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	// *** draw notes [ bottom ] ****
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
	var notes = legend.append('g').attr('class','notes')
		.attr('transform', 'translate( -20, 310)').append('text');

	notes.append('tspan')
		.attr({ 'x':0, 'dy':20 })
		.text('* Score is evaluated in a function of two variables( loans/population and loans ),');
	notes.append('tspan')
		.attr({ 'x':20, 'dy':30 })
		.text('to give weights to states, for more info check README file in the project repo.');
	notes.append('tspan')
		.attr({ 'x':0, 'dy':30 })
		.text('* Each state has a score between 0 and 1.');
	notes.append('tspan')
		.attr({ 'x':0, 'dy':30 })
		.text('* Percentage is the number of loans per state divided by total sum of loans.');
	notes.append('tspan')
		.attr({ 'x':0, 'dy':30 })
		.text('* show ..% is related to the type choosed, examples: ');
	notes.append('tspan')
		.attr({ 'x':20, 'dy':30 })
		.text('- type:loans and 50% will show the states having 50% of total loans.');
	notes.append('tspan')
		.attr({ 'x':20, 'dy':30 })
		.text('- type:population and 70% will show the states having 70% of total population.');
	notes.append('tspan')
		.attr({ 'x':20, 'dy':30 })
		.text('- type:score and 90% will show the states having score equal or higher than .9.');
	notes.append('tspan')
		.attr({ 'x':20, 'dy':30 })
		.text('- type:any and 100% will show all states.');
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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
	var summary = d3.select('.legend .summary text');
	summary.select('#states')
		.text("number of states: " + stats[type][percent]['num_of_states']);
	summary.select('#loans')
		.text('sum of loans: ' + stats[type][percent]['sum_of_loans'].toLocaleString());
	summary.select('#population')
		.text('sum of population : ' + stats[type][percent]['sum_of_population'].toLocaleString());
	summary.select('#total_states')
		.text('total number of states: ' + stats[type][percent]['num_of_states']);
	summary.select('#total_loans')
		.text('total number of loans: ' + stats[type][percent]['sum_of_loans'].toLocaleString());
	summary.select('#total_population')
		.text('total population: ' + stats[type][percent]['sum_of_population'].toLocaleString());
}
function update_state_info(state)
{
	var state_info = d3.select('.legend .state_info text')
	state_info.select('#name')
		.text(state.name);
	state_info.select('#loans')
		.text('Loans : ' + state.loans.toLocaleString());
	state_info.select('#percentage')
		.text('percentage: ' + (state.loans / sum_of_loans * 100).toFixed(2)+"%" );
	state_info.select('#population')
		.text('Population: ' + state.population.toLocaleString());
	state_info.select('#score')
		.text('Score: ' + state.score);
}
