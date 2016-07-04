import React from 'react';
import Square from './square';      //load local class
import Checker from './checker';    //load local class
import Sound from 'react-sound';
import randomColor from 'randomcolor';

export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/

    getInitialState() {
        return {
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

      if(this.props.newRound || this.props.shuffle || this.props.reset){
          this.props.newRound = false;
          this.props.shuffle = false;

          let temp_direction_array = [];
          let temp_checker_array = [];
          let std_mode_checker_start = this._getCheckerStdRandomPosition(0, this.props.size);

          for(let i = 0; i < this.props.size; i++) {
              for(let j = 0; j < this.props.size; j++) {

                  let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                  let direction = this._getSquareDirection();
                  let checker_number = square_number;

                  let first_history = [];
                  first_history.push([i, j]);

                  temp_direction_array.push(direction);

                  //initialize value for initial checkers present
                  let initial_checker_present = null;
                  let sounds = [];  //array stores jsx elements for checkers falling off the board

                  //check condition for standard or advanced mode
                  if(this.props.advanced) {  //render checkers at all positions on board

                      initial_checker_present = {
                          name: checker_number,
                          currentPosition: [i, j],
                          nextPosition: [i+direction.shift[0],j+direction.shift[1]],
                          positionHistory: first_history,
                          isUpdated: false,
                          inCycle: false,
                          randomBackgroundColor: randomColor(),
                          newCheckerStyles: true
                      };

                      //check to see if checker falls off the board (only check if at perimeter board squares)
                      //if it does add to the falling sound array since next render it will fall off
                      let max_board_index = this.props.size - 1;

                      if( i==0 || j==0 ||  i==max_board_index || j==max_board_index ) {
                          sounds = this._soundCheckForCheckerOffBoard(initial_checker_present.nextPosition, max_board_index);
                      } else {
                          sounds = [];
                      }

                      temp_checker_array.push(initial_checker_present);

                      squares.push(
                            <div>
                                <Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={checker_number} checkersPresent={[initial_checker_present]} > </Square>
                                {sounds}
                            </div>
                      );

                  } else if (std_mode_checker_start[0]==j && std_mode_checker_start[1]==i ){  //render checkers only at random selected position

                      initial_checker_present = {
                          name: checker_number,
                          currentPosition: [i, j],
                          nextPosition: [i+direction.shift[0],j+direction.shift[1]],
                          positionHistory: first_history,
                          isUpdated: false,
                          inCycle: false,
                          randomBackgroundColor: randomColor(),
                          newCheckerStyles: true
                      };

                      //check to see if checker falls off the board (only check if at perimeter board squares)
                      //if it does add to the falling sound array since next render it will fall off
                      let max_board_index = this.props.size - 1;

                      if( i==0 || j==0 ||  i==max_board_index || j==max_board_index ) {
                          sounds = this._soundCheckForCheckerOffBoard(initial_checker_present.nextPosition, max_board_index);
                      } else {
                          sounds = [];
                      }

                      temp_checker_array.push(initial_checker_present);

                      squares.push(
                            <div>
                                <Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={checker_number} checkersPresent={[initial_checker_present]} > </Square>
                                {sounds}
                            </div>
                      );

                  } else {  //just render a standard empty square

                    squares.push(
                        <div>
                            <Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={checker_number} checkersPresent={[]} ></Square>
                        </div>
                    );
                      //console.log("we have a problem in standard mode");
                  }

                  square_number++;
              }
          }

          this.state.directionArray = temp_direction_array;    //set new direction array
          this.state.checkerArray = temp_checker_array;        //set new checker array

      } else if (this.props.updateCheckers){

          for(let i = 0; i < this.props.size; i++) {
              for(let j = 0; j < this.props.size; j++) {

                  let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                  let direction = this.state.directionArray[square_number];
                  let current_board_position = [i, j];

                  let new_checkers_present = [];
                  let sounds = [];  //array stores jsx elements for checkers falling off the board


                  let scoped_i = i;
                  let scoped_j = j;
                  //loop through the checkerArray to see which ones should be rendered on this square
                  for(let k=0; k < this.state.checkerArray.length; k++){
                      let current_checker = this.state.checkerArray[k];
                      let current_checker_next_position = current_checker.nextPosition;
                      let current_checker_isUpdated = current_checker.isUpdated;

                      let max_position_history = 2*(this.props.size)*(this.props.size);

                      if((current_checker_next_position.toString() == current_board_position.toString() ) && (!current_checker_isUpdated) ){
                          this.state.checkerArray[k].isUpdated = true;
                          this.state.checkerArray[k].currentPosition = [scoped_i, scoped_j];
                          this.state.checkerArray[k].nextPosition = [scoped_i+direction.shift[0], scoped_j+direction.shift[1]];
                          this.state.checkerArray[k].positionHistory.push([scoped_i,scoped_j]);
                          this.state.checkerArray[k].positionHistory.slice(-max_position_history);  //limit the length of the position array
                          this.state.checkerArray[k].newCheckerStyles=false;

                          //check to see if checker falls off the board (only check if at perimeter board squares)
                          //if it does add to the falling sound array since next render it will fall off
                          let max_board_index = this.props.size - 1;

                          if( scoped_i==0 || scoped_j==0 ||  scoped_i==max_board_index || scoped_j==max_board_index ) {
                              sounds = this._soundCheckForCheckerOffBoard(this.state.checkerArray[k].nextPosition, max_board_index);
                          } else {
                              sounds = [];
                          }

                          new_checkers_present.push(this.state.checkerArray[k]);
                      }
                  }

                  squares.push(
                      <div>
                          <Square key={key} size={this.props.squareSize} color={color} direction={direction} checkerNumber={null} checkersPresent={new_checkers_present} ></Square>
                          {sounds}
                      </div>
                  );

                  square_number++;
              }
          }

          //after full board is refreshed, now reset the isUpdated property for each checker prior to render
          this.state.checkerArray = this.state.checkerArray.map(function(checker_element) {
              checker_element.isUpdated = false;
              return checker_element;
          });
      } else {
         console.log("not doing anything to board render!!");
      }

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
        let board = React.findDOMNode(this.refs.board);
        //console.log("board added");
    },


    /*********  END COMPONENT INITIALIZATION ***********/


    /*********  BEGIN STATE CHANGE METHODS ************/

    //gets called after the render method. Similar to the componentDidMount,
    //this method can be used to perform DOM operations after the data has been updated
    componentDidUpdate() {
        //console.log("board updated");
    },

    /*********  END STATE CHANGE METHODS ************/


    /*********  STANDALONE CUSTOM METHODS ***********/

    //returns a jsx element to render a sound if it determines a checker is moving out of context on next update
    _soundCheckForCheckerOffBoard(checker_next_position, max_board_index){
        let checker_next_x = checker_next_position[0];
        let checker_next_y = checker_next_position[1];

        if(checker_next_x < 0 || checker_next_x > max_board_index || checker_next_y < 0 || checker_next_y > max_board_index ) {
            console.log("checker just fell off the board!");
            return (<Sound playStatus={'PLAYING'} url={`resources/Oddbounce.ogg`} />);
        } else {
            return [];  //return empty array
        }
    },


    _getCheckerStdRandomPosition(min, max){
        let j_value = Math.floor(Math.random() * (max - min)) + min;
        let i_value = Math.floor(Math.random() * (max - min)) + min;

        let start_position = [j_value, i_value];

        return start_position;
    },

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
    }

    /*********  END STANDALONE CUSTOM METHODS ***********/


});
