import React from 'react';
//this syntax is called obejct destructing.
import {Button, ButtonToolbar} from 'react-bootstrap'

export default React.createClass({
    getInitialState() {
        return {
          
        };
    },

    onPlay() {
        this.props.control.play();
        this.props.control.boardIncrementMain();
    },


    onStop() {
        this.props.control.stop();
    },


    onReset() {
        this.props.control.reset();
    },

    onSetSize() {
        this.props.control.setSize();
    },

    onBoardShuffle() {
        this.props.control.shuffle();
    },

    render() {
        return <ButtonToolbar>
            <Button bsStyle="success" onClick={this.onPlay}>Play</Button>
            <Button bsStyle="danger" onClick={this.onStop}>Stop</Button>
            <Button bsStyle="primary" onClick={this.onReset}>Reset</Button>
            <Button onClick={this.onSetSize}>Set Size</Button>
            <Button onClick={this.onBoardShuffle}>Shuffle</Button>
        </ButtonToolbar>
    }
});
