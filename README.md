# RoadWhiz
How far can you go? Can you successfully navigate without crashing? A vanilla Javascript driving game for desktop. 

## Usage
Note: this is a beta version. The game stops after 5 levels, and there are some issues with bounds checking.
In order to run this game, you must dowload the repository and start a live server for the static content. 


### Features
1. pausedTimeout.js - One of my favorite features in this game is the `pausedTimeout.js` mini-library I implemented. In vanilla JS, there is currently no way
to "pause" a setTimeout function, so I implemented a class with the ability to pause a timeout based off the `Date.now()` method. This allows you 
to manage dozens of independent timeouts in a clear, easy-to-use, manner with less bugs. In my case, I use it for a global pause feature.

2. Modular imports - To help manage the complexity of this application, I took advantage of the ES6 modular import system. 
This makes it easier to separate my logic and keep my code organized.





