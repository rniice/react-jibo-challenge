import React from 'react';
//notice we use the relative path syntax when loading local files
import Square from './example-square'

export default React.createClass({
    getInitialState() {
        return {};
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
                squares.push(<Square key={key} size={this.props.squareSize} color={color} />)
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