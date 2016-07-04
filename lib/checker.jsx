import React from 'react';
import Sound from 'react-sound';

//this exports a reference to a React class as the default export
//opted to manage checker properties from board class
export default React.createClass({

    /*********  BEGIN COMPONENT INITIALIZATION ***********/

    //getInitialState method enables to set the initial state value, that is accessible inside the component via this.state.{blah}
    getInitialState() {
        return {
            inCycle: false
        };
    },

    //rendering function that is called each time component gets updated, returns jsx xml/html element
    render() {
        let checker_style = this.props.style;
        let sounds = [];

        //ensure that on reset that the inCycle state variable gets reset
        if(this.props.newCheckerStyles){
            this.state.inCycle=false;
        }

        //if checker is in cycle, set the style accordingly
        if(this.state.inCycle){
            checker_style.borderWidth = '2';
            checker_style.borderColor = '#33AAFF';
            checker_style.fontSize = '20';

        }
        //if checker is not in a cycle, check to see if it is now in a cycle
        else{
            let cycle_check = this._checkCycle(this.props.positionHistory);          //checks if checker has entered a cycle, and sets style if it is

            if(cycle_check) {
                this.state.inCycle = true;
                checker_style.borderWidth = '2';
                checker_style.borderColor = '#33AAFF';
                checker_style.fontSize = '20';

                //push a sound component into the rendered react element
                sounds.push(<Sound playStatus={'PLAYING'} url={`resources/Heal8-Bit.ogg`} />);
            }
            //process.stdout.write('\x07');

        }

        let react_element = (
              <div>
                  <p className = 'checker' ref='checker' style={checker_style}>{this.props.checkerNumber}</p>
                  {sounds}
              </div>
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

    //gets called after the render method. Similar to the componentDidMount,
    //this method can be used to perform DOM operations after the data has been updated
    componentDidUpdate() {
        //checker is a reference to a DOMElement.
        //let checker = React.findDOMNode(this.refs.checker);
        console.log("checker updated");
    },

    /*********  END STATE CHANGE METHODS ************/


    /*********  STANDALONE CUSTOM METHODS ***********/

    /*THE CHECKCYCLE ALGORITHM FUNCTIONS BY SEEING IF HISTORY CONTAINS DUPLICATE
    POSITION IN THE HISTORY ARRAY FOR THE COMPONENT*/
    _checkCycle(history_array){
        let array_strings = history_array.map(function(position){
            return position.toString();
        });

        if (array_strings.length === array_strings.filter(filterUnique).length){
            return false;
        } else {  //we must have a redundant position point
            return true;
        }

        //returns true only when position of value is current value position
        function filterUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
    }

    /*********  END STANDALONE CUSTOM METHODS ***********/

});
