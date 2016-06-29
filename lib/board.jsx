import React from 'react';
import Square from './square'   //load local class



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

        switch(temp_rand) {
            case 0:     result = {name: 'right', shift: [1,0]};    //right arrow
            case 1:     result = {name: 'up', shift: [0,1]};       //up arrow            
            case 2:     result = {name: 'left', shift: [-1,0]};    //left arrow
            default:    result = {name: 'down', shift: [0,-1]};    //down arrow
        }

        return result;
    },

    render() {
        //this example just creates a row of squares. Use CSS styling to
        //get the checkers into a mxm size board

        //create a new array of squares
        let squares = [];
        let key = 0;
        for(let i = 0; i < this.props.size; i++) {
            for(let j = 0; j < this.props.size; j++) {
                let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                let direction = this.getSquareDirection();
                //console.log(direction);

                squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={direction} />)
            }
        }
        let size = (this.props.squareSize + 2) * this.props.size;
        let style = {
            width: size,
            height: size
        };
        return <div style={style}>
            {squares}
        </div>;
    }
});

//need to import directionality/overlay and key for each square.

