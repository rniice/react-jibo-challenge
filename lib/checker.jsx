import React from 'react';

//this exports a reference to a React class as the default export
export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/

    //getDefaultProps can be used to define any default props which can be accessed via this.props.{blah}
    getDefaultProps() {
        return {
            "currentPosition" : [],
            "nextPosition"    : [],
            "color"           : "#FF0000",
            "emitSound"       : "soundfileload.mp3",
            "positionHistory" : [],
            "offboard"        : false,
            "inCycle"         : false
        };

    },

    //getInitialState method enables to set the initial state value, that is accessible inside the component via this.state.{blah}
    getInitialState() {
        return {


        };
    },

    //rendering function that is called each time component gets updated, returns jsx xml/html element
    render() {
        let style = {
            width: this.props.checkerSize,
            height: this.props.checkerSize
            //backgroundImage: this.props.direction.img_path,
            //backgroundColor: this.props.color,
        };
        //To set a div's class in React you must use the 'className' attribute, instead of the
        //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
        let random = Math.random(0,10).toFixed(2).toString();

        var react_element = (
            <div className ='square' ref='square' style={style}>
            <p className = 'checker'>{random}</p>
            </div>);

        return react_element;
    },

    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
    componentDidMount() {
        //square is a reference to a DOMElement.
        let checker = React.findDOMNode(this.refs.checker);
        //checker.append("<h2>Yeah!</h2>");
        console.log("checker added");
    },


    /*********  END COMPONENT INITIALIZATION ***********/


    /*********  BEGIN STATE CHANGE METHODS ************/

    //state changes will triggera number of methods

    /*always called before render() method and checks
      this.state or this.props to determine if render() is to be called*/
    shouldComponentUpdate (nextProps, nextState){
        //Access to the upcoming as well as the current props and state

        // return a boolean value
        return true;
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

        //change some of the params like "hidden" based on onboard or "color" based on incycle

        console.log("checker updated");
    },

    //gets called ONLY when there is a change in props (not a change in this.state)
    componentWillReceiveProps (nextProps) {
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

    }

    /*********  END STATE CHANGE METHODS ************/



    /*********  STANDALONE CUSTOM METHODS ***********/





    /*********  END STANDALONE CUSTOM METHODS ***********/



});
