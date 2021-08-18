# visualizing states of prosper.com borrowers  

### Visualization, gist, and github links
**The visualization: [bl.ocks.org-raw](http://bl.ocks.org/khaledfouda/raw/07b8f3d90f10b06a3938ef9809c8e914/).**    

------------

### Summary  
- Prosper is America’s first marketplace lending platform, with over $8 billion in funded loans. for more information visit [Prosper.com](https://www.prosper.com/).     
- Based on the published loan data, I extracted the number of loans made from each state. [data/borrower_states.csv].
- the company should pay attention to states with high number of loans, but what if these states already have very high number of population!, for this reason I created a new variable called "score" to give each state a score this score is computed by summing (loans/population) and (loans/total_loans) per state then map the values to a value between 0 and 1.  
- Thus states with higher score means that these states have both high number of loans and high number of population which make them worth paying attention to.  
->As shown in the map below, the three states: California, Illinois, and Georgia have score higher than 0.7, moreover, 18 states have score higher than 0.5.

--------

### Design
- As the data describes the states of America so a map would be the best way to show it.  
- Using the geographic data: [data/us-states-geo.json] I draw the map.  
- Also I added color palette to show the difference in values between different states.  
- And an interactive table of information, filters and summary, which leaves to the user the freedom to explore the visualization and get his own conclusions.  
- most of the color used are black and white except for the color palette I used colors from black, blues and white, as you can easily notice that black is higher than blue and blue is higher than white.  

-----------

#### Resources

The loans dataset https://s3.amazonaws.com/udacity-hosted-downloads/ud651/prosperLoanData.csv .  
population data are from the wikipedia page.  https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population

These projects helped me a lot,
- tipsy example http://bl.ocks.org/ilyabo/1373263  
- tipsy library https://github.com/jaz303/tipsy   
- us-states map example http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

-------------------------
