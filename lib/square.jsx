import React from 'react';
//import Sound from 'react-sound';
import Checker from './checker';    //load local class

//this exports a reference to a React class as the default export
export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/

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

        //calculate which checkers are on the square here then if multiple pass a [].map for each checker to generate
        checkers = present_checkers.map(function(present_checker){
            key++;

            let checker_style = {
                fontSize: '10',
                color: '#0000FF',
                backgroundColor: present_checker.randomBackgroundColor
            };

            return (<Checker style={checker_style} key={key} positionHistory={present_checker.positionHistory} inCycle={present_checker.inCycle} checkerNumber={present_checker.name} newCheckerStyles={present_checker.newCheckerStyles}/>);
        });

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

    //gets called after the render method. Similar to the componentDidMount,
    //this method can be used to perform DOM operations after the data has been updated
    componentDidUpdate() {
        //let square = React.findDOMNode(this.refs.square);
        //console.log("square updated");
    }

});
