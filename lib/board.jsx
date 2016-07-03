import React from 'react';
import Square from './square';      //load local class
import Checker from './checker';    //load local class

export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/


    //getDefaultProps can be used to define any default props which can be accessed via this.props.{blah}
    /*
    getDefaultProps() {
        return {
            "newRound" 			  : true,
            "shuffle"         : false,
            "updateCheckers"  : false,
            "complete"    		: false,
            "boardIncrement"	: 0,
            "directionArray"  : []
        };
    },
    */

    getInitialState() {
        return {
            /*
            "boardmap"    : [],
            "checkermap"  : []
            */
            directionArray : [],
            checkerArray : []     //which checkers are on each square
        };
    },

    render() {

	    let size = (this.props.squareSize + 2) * this.props.size;
	    let style = {
	        width: size,
	        height: size
	    };

      let squares = [];
      let key = 0;
      let square_number = 0;

      console.log("newRound value: " + this.props.newRound);
      console.log("shuffle value: " + this.props.shuffle);

      if(this.props.newRound || this.props.shuffle){
          this.props.newRound = false;
          this.props.shuffle = false;

          let temp_direction_array = [];
          let temp_checker_array = [];

          for(let i = 0; i < this.props.size; i++) {
              for(let j = 0; j < this.props.size; j++) {

                  let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                  let direction = this._getSquareDirection();
                  let checker_number = square_number;
                  let first_history = [];
                  first_history.push([i, j]);

                  temp_direction_array.push(direction);

                  let initial_checker_present = {
                      name: checker_number,
                      currentPosition: [i, j],
                      nextPosition: [i+direction.shift[0],j+direction.shift[1]],
                      //positionHistory: first_history,
                      isUpdated: false
                  };

                  //console.log(initial_checker_present);
                  temp_checker_array.push(initial_checker_present);
                  //console.log("at square y = " + i + " x = " + j + " checkernextpos is: " + initial_checker_present.nextPosition.toString());

                  squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={checker_number} checkersPresent={[initial_checker_present]} >
                    </Square>);

                  square_number++;
              }
          }

          this.state.directionArray = temp_direction_array;    //set new direction array
          this.state.checkerArray = temp_checker_array;        //set new checker array

      } else if (this.props.updateCheckers){
          console.log("in updateCheckers mode");
          //console.log(this.state.directionArray);

          for(let i = 0; i < this.props.size; i++) {
              for(let j = 0; j < this.props.size; j++) {

                  let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                  let direction = this.state.directionArray[square_number];
                  let current_board_position = [i, j];

                  let new_checkers_present = [];

                  console.log("i is: " + i);
                  console.log("j is: " + j);

                  let scoped_i = i;
                  let scoped_j = j;
                  //loop through the checkerArray to see which ones should be rendered on this square
                  for(let k=0; k < this.state.checkerArray.length; k++){
                      let current_checker = this.state.checkerArray[k];
                      let current_checker_next_position = current_checker.nextPosition;
                      let current_checker_isUpdated = current_checker.isUpdated;

                      if((current_checker_next_position.toString() == current_board_position.toString() ) && (!current_checker_isUpdated) ){
                          this.state.checkerArray[k].isUpdated = true;
                          this.state.checkerArray[k].currentPosition = [scoped_i, scoped_j];
                          this.state.checkerArray[k].nextPosition = [scoped_i+direction.shift[0], scoped_j+direction.shift[1]];

                          //let position_history_update = current_checker.positionHistory.push([scoped_i,scoped_j]);
                          //this.state.checkerArray[k].positionHistory = position_history_update;
                          //console.log("position history: " + this.state.checkerArray[k].positionHistory);

                          new_checkers_present.push(this.state.checkerArray[k]);
                          console.log("match");
                          //console.log("checkers at position: " + current_board_position);

                          //then afterwards update the checkers at checkerArray position for the current, next, and positionHistory.
                          //console.log(current_checker.positionHistory);
                      }

                      /*
                      let updated_checker_present = {
                          name: current_checker.name,
                          currentPosition: [i, j],
                          nextPosition: [i+direction.shift[0],j+direction.shift[1]]
                          //positionHistory: position_history_update
                      }

                      this.state.checkerArray[k] = updated_checker_present;
                      */


                  }

                  squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={null} checkersPresent={new_checkers_present} >
                    </Square>);

                  square_number++;
              }
          }

          //after full board is refreshed, now reset the isUpdated property for each checker
          this.state.checkerArray = this.state.checkerArray.map(function(checker_element) {
              checker_element.isUpdated = false;
              return checker_element;
          });



      }
      else {
         console.log("not doing anything to board render!!");
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

    /*
    shouldComponentUpdate (nextProps, nextState){
        //Access to the upcoming as well as the current props and state
        //console.log("this.props.newRound is: " + this.props.newRound);

        if(this.props.newRound) {
        	this.props.newRound = false;
        	return true;
        } else {
        	return false;
        }

    },
    */

    //gets called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed
    componentWillUpdate (nextProps, nextState){
        // perform any preparations for an upcoming update
    },

    //gets called after the render method. Similar to the componentDidMount,
    //this method can be used to perform DOM operations after the data has been updated

    componentDidUpdate() {
        //checker is a reference to a DOMElement.
        //let checker = React.findDOMNode(this.refs.checker);
        //this.props.boardIncrement++;
        //console.log(this.props.boardIncrement.toString());
        //change some of the params like "hidden" based on onboard or "color" based on incycle

        console.log("board updated");
    },

    //gets called ONLY when there is a change in props (not a change in this.state)
    /*
    componentWillReceiveProps (nextProps) {
      console.log("called from change in props in board jsx");

      this.setState({
        // set something
      });
    },
    */

    //return true under certain conditions e.g. if the checker goes off board and to be deleted
    /*
    componentWillUnmount (nextProps, nextState){
        if(condition){
            return true;
        } else {
            return false;
        }

    },
    */

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
            result = {name: 'right', img_path: `url("${'./resources/right.png'}")`, shift: [0,1]};    //right arrow
        }
        else if (temp_rand == 1) {
            result = {name: 'up', img_path: `url("${'./resources/up.png'}")`, shift: [-1,0]};       //up arrow
        }
        else if (temp_rand == 2) {
            result = {name: 'left', img_path: `url("${'./resources/left.png'}")`, shift: [0,-1]};    //left arrow
        }
        else {
            result = {name: 'down', img_path: `url("${'./resources/down.png'}")`, shift: [1,0]};    //down arrow
        }

        //console.log(result);
        return result;
    },

    _test(){
      console.log("triggered test function");
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
