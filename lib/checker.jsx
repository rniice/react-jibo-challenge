import React from 'react';

//opted to manage checker properties from board class


//this exports a reference to a React class as the default export
export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/

    //getDefaultProps can be used to define any default props which can be accessed via this.props.{blah}
    /*
    getDefaultProps() {
        return {

        };
    },
    */

    //getInitialState method enables to set the initial state value, that is accessible inside the component via this.state.{blah}
    getInitialState() {
        return null;
    },

    //rendering function that is called each time component gets updated, returns jsx xml/html element
    render() {
        let checker_style = this.props.style;

        //if checker is in cycle, set the style accordingly
        if(this.props.inCycle){
          checker_style.backgroundColor = '#FFFF66';
        }
        //if checker is not in a cycle, check to see if it is now in a cycle
        else{
            let cycle = this._checkCycle(this.props.positionHistory);          //checks if checker has entered a cycle, and sets style if it is

            console.log(cycle);

            if(cycle) {
                this.props.inCycle = true;
            }

        }

        let react_element = (
              <p className = 'checker' ref='checker' style={checker_style}>{this.props.checkerNumber}</p>
            );

        return react_element;
    },

    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
    componentDidMount() {
        //let checker = React.findDOMNode(this.refs.checker);
        console.log("checker added");
    },


    /*********  END COMPONENT INITIALIZATION ***********/


    /*********  BEGIN STATE CHANGE METHODS ************/

    //state changes will triggera number of methods

    /*always called before render() method and checks
      this.state or this.props to determine if render() is to be called*/
    /*
    shouldComponentUpdate (nextProps, nextState){
        //Access to the upcoming as well as the current props and state

        // return a boolean value
        return true;
    },
    */

    //gets called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed
    /*
    componentWillUpdate (nextProps, nextState){
        // perform any preparations for an upcoming update
    },
    */

    //gets called after the render method. Similar to the componentDidMount,
    //this method can be used to perform DOM operations after the data has been updated
    componentDidUpdate() {
        //checker is a reference to a DOMElement.
        //let checker = React.findDOMNode(this.refs.checker);

        //change some of the params like "hidden" based on onboard or "color" based on incycle
        //console.log("checker updated");
    },

    //gets called ONLY when there is a change in props (not a change in this.state)
    /*
    componentWillReceiveProps (nextProps) {
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
    }
    */

    /*********  END STATE CHANGE METHODS ************/


    /*********  STANDALONE CUSTOM METHODS ***********/

    /*THE CHECKCYCLE ALGORITHM FUNCTIONS BY SEEING IF HISTORY CONTAINS DUPLICATE
    POSITION IN THE HISTORY ARRAY FOR THE COMPONENT*/
    _checkCycle(history_array){
        let array_strings_sorted = history_array.map(function(position){
            return position.toString();
        }).sort();

        for (let i=0; i<array_strings_sorted.length; i++){
            let current_value = array_strings_sorted[i];

            if(array_strings_sorted.slice(i+1).indexOf(current_value)>-1) {
                return true;
            }
        }

        //if no duplicates were found, return false
        return false;
    }

    /*********  END STANDALONE CUSTOM METHODS ***********/



});
