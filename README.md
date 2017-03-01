# visualizing states of prosper.com borrowers  

### Gist
the visualization can be viewed on gist from this link : http://bl.ocks.org/bekaa/raw/8e4ca9f935443ba6ddeb2ad5df4402e6/  

------------

### Summary  
- Prosper is America’s first marketplace lending platform, with over $8 billion in funded loans. for more information visit [Prosper.com](https://www.prosper.com/).     
- Based on the published loan data, I extracted the states with the number of loans made of each state. [data/borrower_states.csv].  
- And as shown, the highest number of loans goes to california (14,717 loans), after it comes texas/newyork/florida (around 6,700 loans).  
- Most of the states have number of loans less than 1,000 .  

--------

### Design
- I used the geographic data of united states [data/us-states-geo.json] to draw a map,  
- Used color palette to give states with higher number of loans a darker color and vice versa,   
- Added two arcs one for the total number of loans and it's percentage, and the other for each state.   
- The length of the state's arc is proportional to the max number of loans in a state (CA).  
- Also I included animation to show states one by one sorted by number of loans, and two buttons one for skipping and the other for replaying the animation.    

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

These projects helped me alot,

http://bl.ocks.org/ilyabo/1373263                        ----  tipsy example  
https://github.com/jaz303/tipsy                          ----  tipsy library  
https://bl.ocks.org/mbostock/6408735                     ----  buttons example  
http://codepen.io/anon/pen/NqWQNg                        ----  arc example  
http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922  ----  us-states map example  

-------------------------
