# RoadWhiz
How far can you go? Can you successfully navigate without crashing? A vanilla Javascript driving game. 

## Usage
Note: this is a beta version. The game stops after 5 levels, and there are some issues with bounds checking.
In order to run this game, you must dowload the repository and start a live server for the static content. 
To help manage the complexity of this application, I took advantage of the ES6 modular import system.

### Features
One of my favorite features in this game is the `pausedTimeout.js mini-library` I implemented. In vanilla JS, there is currently no way
to "pause" a setTimeout function, so I implement a class with the ability to pause a timeout based off the `Date.now()` method.


