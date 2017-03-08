# visualizing states of prosper.com borrowers  

### Visualization, gist, and github links
the project files can be viewed on gist from each of these links : [gist.github](https://gist.github.com/bekaa/8e4ca9f935443ba6ddeb2ad5df4402e6) or [bl.ocks.org](http://bl.ocks.org/bekaa/8e4ca9f935443ba6ddeb2ad5df4402e6/)  
And the Visualization from this link : [bl.ocks.org-raw](http://bl.ocks.org/bekaa/raw/8e4ca9f935443ba6ddeb2ad5df4402e6/).  
And for sure the github repository https://github.com/bekaa/prosper-data-visualization .  

------------

### Summary  
- Prosper is America’s first marketplace lending platform, with over $8 billion in funded loans. for more information visit [Prosper.com](https://www.prosper.com/).     
- Based on the published loan data, I extracted the states with the number of loans made of each state. [data/borrower_states.csv].
- Company should pay attention to states with high number of loans, but what if these states already have very high number of population!, for this reason I created a new variable called "score" to give each state a score this score is computed by summing (loans/population) and (loans/total_loans) per state then map the values to a value between 0 and 1.  
- Thus states with higher score means that these states have both high number of loans and high number of population which make them worth paying attention to.  
- And as map shows, 3 states have score higher than 0.7 which are California, Illinois, and Georgia.
- And 18 states have score higher than 0.5.  

--------

### Design
- As the data describes the states of America so a map would be the best way to show it.  
- Using the geographic data: [data/us-states-geo.json] I draw the map.  
- Also I added color palette to show the difference in values between different states.  
- And an interactive table of information, filters and summary, which leaves to the user the freedom to explore the visualization and get his own conclusions.  
- most of the color used are black and white except for the color palette I used colors from black, blues and white, as you can easily notice that black is higher than blue and blue is higher than white.  

-----------

### Feedback
1 -
>Good work! There's just one thing I found that might need a bit of tweaking...The curve/circle surrounding the state level data seems to correspond to the magnitude of the state's loan percentage number. Normally, when looking at a circle or pie chart, a reader would expect the length of the curve to be proportional to the percentage number - if the number is 1%, then the length of the curve is 1% of the circle circumference. However, that doesn't seem to be the case...therefore could be a possible cause of confusion.  

I added a note below the curve explaining how the value of the curve is computed.   
2.
>  Great job with your visualization ! I really enjoyed the interactivity and the way you approached in displaying the day. My only suggestion is that the red font is a little harsh on the eyes (in comparison to the other colors you've chosen on your map) and perhaps you'd like to change that. Besides that I enjoyed examining the data you presented.

I felt that the red font isn't bad, I don't know if I'm right or wrong.  
3.
>Really good animation is "clean" and combines the animation with the user exploration very well.

---------------   

#### Resources

The loans dataset https://s3.amazonaws.com/udacity-hosted-downloads/ud651/prosperLoanData.csv .  
population data are from this wikipedia page.  https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population

These projects helped me alot,
- tipsy example http://bl.ocks.org/ilyabo/1373263
- tipsy library https://github.com/jaz303/tipsy                   
- us-states map examplehttp://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922  ----    

-------------------------
