# RoadWhiz
How far can you go? Can you successfully navigate without crashing? A vanilla Javascript driving game for desktop. A playable version is available here: https://road-whiz.netlify.app/ (beta version)

## Usage
Note: this is a beta version. The game stops after 5 levels, and there are some issues with bounds checking.
In order to run this game, you must dowload the repository and start a live server for the static content. 


### Features
1. pausedTimeout.js - One of my favorite features in this game is the `pausedTimeout.js` mini-library I implemented. In vanilla JS, there is currently no way
to "pause" a setTimeout function, so I implemented a class with the ability to pause a timeout based off the `Date.now()` method. This allows you 
to manage dozens of independent timeouts in a clear, easy-to-use, manner with less bugs. In my case, I use it for a global pause feature.

2. Modular imports - To help manage the complexity of this application, I took advantage of the ES6 modular import system. 
This makes it easier to separate my logic and keep my code organized. In order to implement this in HTML5, the following code is required: `<script type="module" src="./script.js"></script>`

3. Content generation - Similar to using an external framework such as React, all of the HTML content is
separated into components and generated dynamically with Javascript. A position/color/rotation object argument is specified, making it easier to generate
content, maps, and specify location.

4. Graphics - All of the graphics, cars, trees, etc. were designed in plain CSS. No external icons or SVG's.





