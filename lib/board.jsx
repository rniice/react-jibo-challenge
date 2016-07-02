import React from 'react';
import Square from './square';      //load local class
import Checker from './checker';    //load local class

export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/


    //getDefaultProps can be used to define any default props which can be accessed via this.props.{blah}
    getDefaultProps() {
        return {
            //"newRound" 			  : true,
            //"shuffle"         : true,
            "complete"    		: false,
            "boardIncrement"	: 0,
            "directionArray"  : []
        };

    },

    getInitialState() {
        return {
            "boardmap"    : [],
            "checkermap"  : []
        };
    },

    //make a function that render can call to determine what properties get updated


    render() {
      //this example just creates a row of squares. Use CSS styling to
      //get the checkers into a mxm size board

      //console.log(this.props.boardIncrement);

	    let size = (this.props.squareSize + 2) * this.props.size;
	    let style = {
	        width: size,
	        height: size
	    };

      //if(this.props.newRound) {          //create a new array of squares and checkers
      let squares = [];

      let key = 0;
      let square_number = 0;

      console.log("newRound value: " + this.props.newRound);
      console.log("shuffle value: " + this.props.shuffle);

      if(this.props.newRound || this.props.shuffle){

          this.props.directionArray = [];    //reset the stored direction array
          this.props.newRound = false;
          this.props.shuffle = false;

          for(let i = 0; i < this.props.size; i++) {
              for(let j = 0; j < this.props.size; j++) {
                  square_number++;

                  let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                  let direction = this._getSquareDirection();
                  this.props.directionArray.push(direction);

                  squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={square_number}>
                    </Square>);
              }
          }

      } else {

          for(let i = 0; i < this.props.size; i++) {
              for(let j = 0; j < this.props.size; j++) {
                  square_number++;

                  let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                  let direction = this.props.directionArray[square_number];

                  squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={square_number}>
                    </Square>);
              }
          }

      }

      //this.props.newRound = false;

      return <div className='board' ref='board' style={style}>
          {squares}
      </div>;


    },


    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
    componentDidMount() {
        //square is a reference to a DOMElement.
        let board = React.findDOMNode(this.refs.board);
        console.log("board added");
    },


    /*********  END COMPONENT INITIALIZATION ***********/


    /*********  BEGIN STATE CHANGE METHODS ************/

    //state changes will triggera number of methods

    /*always called before render() method and checks
      this.state or this.props to determine if render() is to be called*/
    shouldComponentUpdate (nextProps, nextState){
        //Access to the upcoming as well as the current props and state
        console.log("this.props.newRound is: " + this.props.newRound);

        return true;
        /*
        if(this.props.newRound) {
        	this.props.newRound = false;
        	return true;
        } else {
        	return false;
        }
        */
    },

    //gets called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed
    componentWillUpdate (nextProps, nextState){
        // perform any preparations for an upcoming update
    },

    //gets called after the render method. Similar to the componentDidMount,
    //this method can be used to perform DOM operations after the data has been updated
    componentDidUpdate() {
        //checker is a reference to a DOMElement.
        //let checker = React.findDOMNode(this.refs.checker);
        this.props.boardIncrement++;
        console.log(this.props.boardIncrement.toString());
        //change some of the params like "hidden" based on onboard or "color" based on incycle

        console.log("board updated");
    },

    //gets called ONLY when there is a change in props (not a change in this.state)
    componentWillReceiveProps (nextProps) {
      console.log("called from change in props in board jsx");

      this.setState({
        // set something
      });
    },

    //return true under certain conditions e.g. if the checker goes off board and to be deleted
    componentWillUnmount (nextProps, nextState){
        if(condition){
            return true;
        } else {
            return false;
        }

    },


    /*********  END STATE CHANGE METHODS ************/



    /*********  STANDALONE CUSTOM METHODS ***********/

    //returns coordinate shift [+x, +y]
    _getSquareDirection() {
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
        //this.props.boardIncrement++;
        console.log("updating board state");

    }


    /*********  END STANDALONE CUSTOM METHODS ***********/
    /*
    boardIncrement(){
        console.log("triggered boardIncrement in board.jsx");

    }
    */
});

//need to import directionality/overlay and key for each square.
