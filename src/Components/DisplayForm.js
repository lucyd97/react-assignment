import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css';
import OneWay from './OneWay.js';
import Return from './Return.js';

/*
* DisplayForm Component
*   - receives state information from Main component as props
*   - renders the layout to display the search results
*   - different child component rendered based on whether the user has search for a one way or return flight
*/

class DisplayForm extends React.Component {

  render() {
      return (
        <React.Fragment>
            {this.props.details.origin === "" ? (
                <h1></h1>
            ) : (
                this.props.details.isReturn ? (
                    <Return details = {this.props.details} first = {this.props.first} second = {this.props.second}/>
                ) : (
                    <OneWay details = {this.props.details} first = {this.props.first}/>
                )
            )}
        </React.Fragment>
    )
  } 

}
export default DisplayForm;