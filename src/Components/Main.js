import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css';
import SearchForm from './SearchForm'
import DisplayForm from './DisplayForm'
import Wellington from "../images/Wellington.png";
import Auckland from "../images/Auckland.jpg";
import Queenstown from "../images/Queenstown.jpg";

/*
* Main Component
*   - retrieves flight information from flights.json
*   - renders the layout of the page - SearchForm and DisplayForm components
*   - takes state information from SearchForm - search details the user has entered
*   - filters flights based of the users search
*       - user may want a one way flight, or a return flight
*           - if return: have to find pairs of flights that match (i.e. dates/times make sense)
*       - format time and date for user-friendly output
*   - passes the filtered flights to DisplayForm component to display list of suitable flights
*/

class Main extends React.Component {
  constructor() {
    super()
    this.state = { 
        flights : [],
        origin : "",
        dest : "",
        depart : "",
        return : "",
        passengers : 1,
        price : 0,
        isReturn : false,
        filtered_flights: [],
        image:null,
        departString:"",
        returnString:""
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
  }

  /* retrieves flight information from flights.json */
  componentDidMount() {
    axios.get("http://localhost:3000/flights")
    .then(result => {
        this.setState({
            flights: result.data,
        })
    })
    .catch(error => 
        this.setState({
            error,
        })
    );
}

  /* Updates the state of Main based on the Search entered by the user */
  updateSearch(newState) {
    /* selects the appropriate image (of the destination) to be displayed */
    var image = null;
    if (newState.dest === "Wellington") {
        image = Wellington;
    } else if (newState.dest === "Auckland") {
        image = Auckland;
    } else if (newState.dest === "Queenstown") {
        image = Queenstown;
    }
    
    /* formats the departure and arrival date for user-friendly output */
    var departDate = new Date(newState.depart);
    var returnDate = new Date(newState.return);

    this.setState ({
        origin:newState.origin,
        dest:newState.dest,
        depart:newState.depart,
        return:newState.return,
        passengers:newState.passengers,
        price:newState.price,
        isReturn:newState.isReturn,
        image:image,
        departString:departDate.toDateString(),
        returnString:returnDate.toDateString()
    });
    this.updateState(newState);
  }

  /* Method to format departure and arrival time for user-friendly output */
  formatTime(time) {
      var timeString = "";
      if (time < 1200) {
        time = time/100.00;
        if (time%1===0) {
            timeString = time + ".00 AM";
        } else {
            timeString = time + "0 AM";
        }
      } else if (time === 1200) {
        time = time/100.00;
        if (time%1===0) {
            timeString = time + ".00 PM";
        } else {
            timeString = time + "0 PM";
        }
      } else {
        time = (time-1200)/100.00;
        if (time%1===0) {
            timeString = time + ".00 PM";
        } else {
            timeString = time + "0 PM";
        }
      }
      return timeString;
  }
/* fiters flights to select only those from origin to destination and vice versa */
  updateState(newState) {
    var originDestNew = [];
    var destOriginNew = [];
    var originDestOneWay = [];
    this.state.flights.map(flight => {
        if (flight.origin === newState.origin && flight.destination === newState.dest && flight.departDate === newState.depart) {
            /* calls method to format departure and arrival time for user-friendly output */
            flight.departString = this.formatTime(flight.departTime);
            flight.arriveString = this.formatTime(flight.arriveTime);
            originDestNew.push(flight);
            if ((flight.price * newState.passengers) <= newState.price) {
                originDestOneWay.push({
                    origin : flight,
                    totalPrice : (flight.price * newState.passengers)
                });
            }
        } else if (flight.origin === newState.dest && flight.destination === newState.origin && flight.departDate === newState.return && newState.isReturn) {
            flight.departString = this.formatTime(flight.departTime);
            flight.arriveString = this.formatTime(flight.arriveTime);
            destOriginNew.push(flight);
        }
    })

    if (newState.isReturn) {
        /* if the user wants a return flight, calls method to organise pairs of flights that match */
        this.setPairs(originDestNew, destOriginNew, newState.price, newState.passengers);
    } else {
        /* otherwise we only need the list of flights from origin to destination */
        this.setState({
            filteredFlights : originDestOneWay,
        });
    }
    
}

/* Method to organise pairs of flights that match */
setPairs(origin, dest, price, passengers) {
    var pairsList = [];
    origin.forEach(originFlight => {
        dest.forEach(destFlight => {
            if (((originFlight.departDate !== destFlight.departDate) || 
            (originFlight.arriveTime < destFlight.departTime)) && 
            ((originFlight.price + destFlight.price)*passengers) <= price) {
                pairsList.push({
                    origin : originFlight,
                    dest : destFlight,
                    totalPrice : ((originFlight.price + destFlight.price)*passengers)
                });
            }
        })
    });
    this.setState({
        filteredFlights : pairsList
    });
}

/* Method to update the price range selected by the user */
updatePrice(newPrice) {
    this.setState({
        price : newPrice
    });
    var newState = {
        ...this.state,
        price : newPrice
    };
    this.updateState(newState);
};

/* Rendering the title, SearchForm and DisplayForm components*/
  render() {
      return (
        <div class="container"> 
        <h1>Flight Search Engine</h1>
        <hr/>
            <div className="row">
                <div className="col-sm-3 aligncenter gridbordergrey whitebackground">
                    <SearchForm updateSearch = {this.updateSearch} updatePrice = {this.updatePrice}/>
                </div>
                <div className="col-sm-9 aligncenter gridbordergrey whitebackground">
                    <DisplayForm details = {this.state} first = {this.state.filteredFlights}/>
                </div>
                
            </div>
        </div>
    )
  } 

}
export default Main;