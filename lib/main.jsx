//all import statements must go at the top of the file.
import React from 'react';
import Board from './board';
import Controls from './controls';

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

//This is a React class. It's main methods are 'getInitialState', and 'render'.
let Main = React.createClass({

    getInitialState() {
        return {
            size: this.props.size,
            squareSize: this.props.squareSize
        };
    },

    play() {
        console.log("Play");
    },

    stop() {
        console.log("Stop");
    },

    reset() {
        var initial_state = this.getInitialState();
        this.setSize(initial_state);
        console.log("Reset");
    },

    setSize(args) {
        //we update our internal state.
        if(args) {
            this.state.size = args.size;
            this.state.squareSize = args.squareSize;
        }
        else if(this.state.size <= 20){
            this.state.size+=2;
            this.state.squareSize -=4;
        } else {
            this.state.size = 5;
            this.state.squareSize = 80;
        }
        //setting our state forces a rerender, which in turn will call the render() method
        //of this class. This is how everything gets redrawn and how you 'react' to user input
        //to change the state of the DOM.
        this.setState(this.state);
    },

    render() {
        var react_element = (<div><Controls control={this}/><Board size={this.state.size} squareSize={this.state.squareSize}/></div>);
        return react_element;
    }


});

//this is the entry point into react. From here on out we deal almost exclusively with the
//virtual DOM. Here we tell React to attach everything to the content DOM element.
React.render(<Main squareSize={80} size={5}/>, content, () => {
    console.log("Rendered!");
});
