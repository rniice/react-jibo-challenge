import React from 'react';
//import Sound from 'react-sound';
import Checker from './checker';    //load local class

//this exports a reference to a React class as the default export
export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/

    //getDefaultProps can be used to define any default props which can be accessed via this.props.{blah}
    /*
    getDefaultProps() {
        return {
            "index"           : 0,
            "position"        : [0,0]
        };

    },
    */

    //getInitialState method enables to set the initial state value, that is accessible inside the component via this.state.{blah}
    /*
    getInitialState() {
        return {


        };
    },
    */

    //rendering function that is called each time component gets updated, returns jsx xml/html element
    render() {

        let checkers = [];
        let key = 0;

        let square_style = {
            width: this.props.size,
            height: this.props.size,
            backgroundImage: this.props.direction.img_path,
            backgroundColor: this.props.color
        };

        let present_checkers = this.props.checkersPresent;

        let checker_style = {
            fontSize: '20',
            color: '#0000FF'
        };

        //for each present checker on the square add a new checker using map function
        checkers = present_checkers.map(function(present_checker){
            key++;
            return (<Checker style={checker_style} key={key} checkerNumber={present_checker.name}/>);

        });

        //calculate which checkers are on the square here then if multiple pass a [].map for each checker to generate
        //checkers.push(<Checker style={checker_style} key={'woof'} checkerNumber={this.props.checkerNumber}/>);

        //To set a div's class in React you must use the 'className' attribute, instead of the
        //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.

        //console.log(this.props.key);

        var react_element = (
            <div className ='square' ref='square' key={this.props.key} style={square_style}>
              {checkers}
            </div>);

        return react_element;
    },

    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
    componentDidMount() {
        let square = React.findDOMNode(this.refs.square);
        //console.log("square added");
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
        //square is a reference to a DOMElement.
        //let checker = React.findDOMNode(this.refs.checker);
        //checker.append("<h2>Yeah!</h2>");
        console.log("square updated");
    },


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





    /*********  END STANDALONE CUSTOM METHODS ***********/

});
