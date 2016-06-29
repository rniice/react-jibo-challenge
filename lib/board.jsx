import React from 'react';
import Square from './square';      //load local class
import Checker from './checker';    //load local class

export default React.createClass({
    getInitialState() {
        return {};
    },

    //returns coordinate shift [+x, +y]
    getSquareDirection() {
        let result = null;

        // Returns a random integer between min (included) and max (excluded)
        let min = 0;
        let max = 4;
        let temp_rand = Math.floor(Math.random() * (max - min)) + min;

        if (temp_rand == 0) {
            result = {name: 'right', img_path: `url("${'./resources/right.png'}")`, shift: [1,0]};    //right arrow
        } 
        else if (temp_rand == 1) {
            result = {name: 'up', img_path: `url("${'./resources/up.png'}")`, shift: [0,1]};       //up arrow            
        }        
        else if (temp_rand == 2) {
            result = {name: 'left', img_path: `url("${'./resources/left.png'}")`, shift: [-1,0]};    //left arrow
        }
        else {
            result = {name: 'down', img_path: `url("${'./resources/down.png'}")`, shift: [0,-1]};    //down arrow
        }

        //console.log(result);
        return result;
    },

    updateBoardState() {
        console.log("updating board state");

    },

    render() {
        //this example just creates a row of squares. Use CSS styling to
        //get the checkers into a mxm size board

        //create a new array of squares and checkers
        let squares = [];
        let checkers = [];

        let key = 0;
        for(let i = 0; i < this.props.size; i++) {
            for(let j = 0; j < this.props.size; j++) {
                let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                let direction = this.getSquareDirection();
                //console.log(direction);

                squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={direction} />);
                checkers.push(<Checker key={key} size={this.props.checkerSize} color={color} />);
            }
        }

        let size = (this.props.squareSize + 2) * this.props.size;
        let style = {
            width: size,
            height: size
        };


        return <div style={style}>
            {squares},
            {checkers}
        </div>;
    }
});

//need to import directionality/overlay and key for each square.

