//all import statements must go at the top of the file.
import React from 'react';
import Board from './board';
import Controls from './controls';
//import Checker from './checker'     //load local class

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

let refresh_interval = null;
let refresh_rate     = 2000;    //2 sec


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
        let that = this;
        if(!refresh_interval){
            refresh_interval = setInterval(function() {
                that.updateRender();
            }, refresh_rate);            
        } else{
            console.log("already playing");
        }
    },

    stop() {
        console.log("Stop");
        clearInterval(refresh_interval);
        refresh_interval = null;
    },

    reset() {
        console.log("Reset");
        this.stop();
        var initial_state = this.getInitialState();
        this.setSize(initial_state);
    },

    setSize(args) {
        //first, make sure we clear any running program
        clearInterval(refresh_interval);
        refresh_interval = null;

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

    updateRender() {
        //this.state.boardIncrement++;
        this.setState(this.state);
        console.log("updating render boardIncrement: " + this.state.boardIncrement);

    },

    render() {
        var react_element = (
            <div>
                <Controls control={this}/>
                <Board size={this.state.size} 
                    squareSize={this.state.squareSize} 
                    checkerSize={this.state.checkerSize} 
                    boardIncrement={this.state.boardIncrement}>
                </Board>
            </div>);
        return react_element;
    }


});

//this is the entry point into react. From here on out we deal almost exclusively with the
//virtual DOM. Here we tell React to attach everything to the content DOM element.
React.render(<Main squareSize={80} checkerSize={30} size={5} boardIncrement={0}/>, content, () => {
    console.log("Rendered!");
});
