//all import statements must go at the top of the file.
import React from 'react';
import Board from './board';
import Controls from './controls';
//import IPod from './node_modules/ipod/index.js';
//var Ipod = require('ipod');

//get the content DOMElemet create in index.html
let content = document.getElementById('content');
let board = document.getElementById('board');

let refresh_interval = null;
let refresh_rate     = 200;    //200 ms


//This is a React class. It's main methods are 'getInitialState', and 'render'.
let Main = React.createClass({

    //getDefaultProps can be used to define any default props which can be accessed via this.props.{blah}
    getDefaultProps() {
        return null;
    },

    //getInitialState method enables to set the initial state value, that is accessible inside the component via this.state.{blah}
    getInitialState() {
        return {
            size: this.props.size,
            squareSize: this.props.squareSize,
            updateCheckers: false,  //calculate and run next move
            newRound: true,
            shuffle: false,
            reset: false,
            advanced: false
        };
    },

    render() {
        var react_element = (
            <div>
                <Controls control={this}>
                </Controls>

                <Board
                    board={this}
                    size={this.state.size}
                    squareSize={this.state.squareSize}
                    checkerSize={this.state.checkerSize}
                    newRound={this.state.newRound}
                    shuffle={this.state.shuffle}
                    advanced={this.state.advanced}
                    updateCheckers={this.state.updateCheckers}/>
            </div>);

        return react_element;
    },


    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
    componentDidMount() {
        console.log("main component added");
    },


    /*********  STANDALONE CUSTOM METHODS ***********/

    play() {
        console.log("Play");
        //this.setState({newRound: false});
        this.setState({'updateCheckers': true, 'newRound': false, 'shuffle': false});

        let that = this;
        if(!refresh_interval){
            refresh_interval = setInterval(function() {
                that.setState(that.state);    //call setState to force a re-render
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
        this.setState({'updateCheckers': false, 'newRound': true, 'shuffle': false, 'reset': true, 'advanced': false});
        var initial_state = this.getInitialState();
        this.setSize(initial_state);
    },

    toggleWildMode(){
        this.setState({'advanced': true});   //toggle on for an update

    },

    setSize(args) {
          //first, make sure we clear any running program
          clearInterval(refresh_interval);
          refresh_interval = null;
          this.setState({'updateCheckers': false, 'newRound': true, 'shuffle': false, 'reset': true});

          let new_size = null;
          let new_square_size = null;
          let new_checker_size = null;

        //we update our internal state.
          if(args) {
              new_size = args.size,
              new_square_size = args.squareSize,
              new_checker_size = args.checkerSize
          }
          else if(this.state.size <= 20){
              new_size = this.state.size + 2;
              new_square_size = this.state.squareSize - 4;
              new_checker_size = this.state.checkerSize - 4;
          } else {
              new_size = 5,
              new_square_size = 80,
              new_checker_size = 80
          }

        //this.stop();

        this.setState({
            size: new_size,
            squareSize: new_square_size,
            checkerSize: new_checker_size
        });
    },

    shuffle() {
        //this.stop();
        this.setState({shuffle: true});   //toggle on for an update
        this.setState({shuffle: false});  //then immediately toggle off

        //this._playSound();
    },

    updateRender() {
        //this.props.board.boardIncrement +=1;
        console.log("updating render animation in mainjsx");

        this.setState(this.state);
        //this.setState(this.state);
        //console.log(this.props.board.boardIncrement.toString());
    }

/*
    _playSound() {
        // create ipod instance
        var ipod = new IPod('./resources/unscrew_lightbulb-mike-koenig.mp3');

        // play now and callback when playend
        ipod.play();

        setTimeout(function(){
        	// stop playing
        	ipod.stop();
        },500);

    }
*/


    /*********  END STANDALONE CUSTOM METHODS ***********/

});

//this is the entry point into react. From here on out we deal almost exclusively with the
//virtual DOM. Here we tell React to attach everything to the content DOM element.
React.render(<Main newRound={true} shuffle={false} updateCheckers={false} squareSize={80} checkerSize={30} size={5}/>, content, () => {
    console.log("Rendered!");
});
