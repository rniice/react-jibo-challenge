# Prerequisites
Install [node.js](https://nodejs.org) on your system.

# node.js and npm

`node.js` is a JavaScript application runtime that allows you to run JavaScript in a desktop or server environment.
`node.js` includes a package manager called [`npm`](https://www.npmjs.com/). The `npm`
[documentation](https://docs.npmjs.com/) is a good resource, but here's the cheat sheet for this project.

  - You can search for libraries you want to use [here](https://www.npmjs.com/) (or use our benevolent overlord
  [Google](http://google.com)).
  
  - Once you know you want to use a library, say it's `lodash`, go to the root of the project and run
  `npm install lodash --save`. This will download the lodash library from the npm public repository and place
  it in a folder called `node_modules` in your project root. It will also update your dependency list in 
  [`package.json`](https://github.com/golgobot/programming-challenge/blob/master/package.json).
  
  - In your code you can load a library module one of two ways
    1. `var $ = require('lodash');` This is the ECMAScript 5 notation.
    1. `import $ from 'lodash';` This is the ECMAScript 6 notation.

# Installing dependencies

In the project root run `npm install`. This will download and install into a folder called `node_modules` 
all the dependencies listed in 
[`package.json`](https://github.com/golgobot/programming-challenge/blob/master/package.json).

# Running using Electron

This project's runtime is [Electron](http://electron.atom.io/). Electron is sort of like Chrome and node.js combined
into one runtime. It allows developers to create desktop applications using web technologies.

## Method 1

Install electron globally

`npm install electron-prebuilt -g`

Go to the project root and run `electron .`

## Method 2

Go to the project root and run `electron bin/launch.js`.

# Debugging

Since Electron is built on Chrome, you get to use Chrome's devTools. Dev tools allows you to inspect DOM elements, 
read `console.log` output, set breakpoints, and everything else you'd expect from a debugger. To open the dev tools
go to `View -> Toggle DevTools`.

If you make a change and want to reload the application go to `View -> Reload`.

# The Challenge

Consider a checkerboard of unknown size. On each square is an arrow that randomly points either up, down, 
left, or right. A checker is placed on a random square. Each turn the checker moves one square in the direction 
of the arrow. Visualize an algorithm that determines if the checker moves off the edge of the board.

  - Include UI controls to play, stop, and reset the game.
  - Include UI controls to change the size of the board and to shuffle the arrows.
  - Include audio to make things more interesting.
  - Add some style to make it look good.
  
The skeleton project is set up to use a front end framework called [React](https://facebook.github.io/react/). React is pretty easy to learn, so definitely read the documentation. The skeleton project has one example of each important aspect of React. So please be sure to study the comments and the code.
The UI is setup using [react-bootstrap](http://react-bootstrap.github.io/components.html). React-bootstrap has
common UI elements such as buttons, and inputs so should help speed up development.

Using react and react-bootstrap isn't required, but it can really help speed development.

# Some important notes

Use the file extension `.jsx` for all your javascript files. The project is automagically setup to recognize that extension and transpile the JSX (used with React) and ES6 syntax to regular ES5 at runtime.

The entry point to the application is `index.html`, which in turn points immediately to `lib/main.jsx`. Do not modify `main.js`, which is just a bootstrap to get electron running.

Use whatever libraries you want from the npm public repository. Again you can find them [here](https://www.npmjs.com/) and install them with `npm install cool-lib-i-found --save`. 

# Submitting

Create a github repo for your solution and submit this repo.
