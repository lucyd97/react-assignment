import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css';

/**
 * SearchForm Component
 *  - renders the search form on the left hand side of the page
 *  - form allows users to search for flights
 *  - current state of SearchForm reflects current information entered into the form
 *  - changes to price refine slider handled separately so user can refine the price without having
 *    to click "Search" button again
 *  - when the user clicks "Search" button, current state of SearchForm passed to Main Component
 *      - Main Component then filters flights based on the user's search
 */

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        origin : "",
        dest : "",
        depart : "",
        return : "",
        passengers : 1,
        price : 0,
        isReturn : false
    };
  }

  triggerReturn = () => {
    this.setState({isReturn:true});
  }

  triggerOneWay = () => {
    this.setState({isReturn:false});
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleSubmit = () => {
    this.props.updateSearch(this.state);
  }

  handlePrice = (event) => {
      var newPrice = event.target.value;
      this.props.updatePrice(newPrice);
      this.setState({
          price:newPrice
      })
  }

  render() {
      return (
        <React.Fragment> 
        <ul class="nav nav-tabs ">
            <li><p class="nav-link" style={{fontSize:"13px"}} onClick={this.triggerOneWay}>One way&nbsp;&nbsp;</p></li>
            <li><p class="nav-link" style={{fontSize:"13px"}} onClick={this.triggerReturn}>Return</p></li>         
        </ul><br/>
        <div id="form">
        <form>
            <input type="text" name="origin" id="origin" placeholder = "Enter origin city" onChange={(e)=>this.handleChange(e)}/><br/><br/>
            <input type="text" name="dest" id="dest" placeholder = "Enter destination city" onChange={(e)=>this.handleChange(e)}/><br/><br/>
            <input type="date" name="depart" id="depart" placeholder="Departure date" onChange={(e)=>this.handleChange(e)}/><br/><br/>
            {this.state.isReturn ?  (
                <div>
                <input type="date" name="return" id="return" placeholder="Return date" onChange={(e)=>this.handleChange(e)}/><br/><br/>
                </div>
            ): (
               null 
            )}
            <input type="number" name="passengers" id="passengers" placeholder="Passengers" min="1" max="10" onChange={(e)=>this.handleChange(e)}/><br/><br/>
            <input type="button" value="Search" onClick={this.handleSubmit}/><br/><br/>
            <label for="price">Refine flight search</label><br/>
            <input type="range" name="price" id="price" min="0" max="1000" step="20" onChange={(e)=>this.handlePrice(e)}/>
            <p id="price_value">${this.state.price}</p>
        </form><br/><br/>
        </div>
        </React.Fragment>
    )
  } 

}



export default SearchForm;