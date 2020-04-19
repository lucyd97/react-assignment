import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css';

/**
 * OneWay Component
 *  - rendered if the user has searched for a one way flight (i.e. isReturn is false)
 */

class OneWay extends React.Component {

    render() {
      return (
          <React.Fragment>
          <div class="container"> 
          <div class="row">
          <div class="col-sm-8 aligncenter gridbordergrey whitebackground">
          <h3>{this.props.details.origin} > {this.props.details.dest}</h3>
          </div>
          <div class="col-sm-4 aligncenter gridbordergrey whitebackground">
          <p>Depart: {this.props.details.departString}</p>
          </div>
          </div>
          </div>
          <br/>
          
          <div class="table-responsive">
                  <table class="table">
                  <tbody>
                  {this.props.first.map(flight => {
                      return  (<tr key={flight.origin.flightNo}>
                                  <td>
                                      <div>
                                      <h5>${flight.totalPrice}</h5>
                                      <p>{flight.origin.flightNo}</p>
                                      <h6>{flight.origin.originCode} > {flight.origin.destCode}</h6>
                                      <h6>Depart: {flight.origin.departString}</h6>
                                      <h6>Arrive: {flight.origin.arriveString}</h6>
                                      </div>
                                  </td>
                                  <td></td>
                                  <td>
                                  <div style={{textAlign : 'center'}}>
                                      <img src={this.props.details.image} className="Wellington" alt="Destination" width="150px"/>
                                      <br/><br/>
                                      <input type="button" value="Book this Flight"/>
                                  </div>
                                  </td>
                          </tr>)
                  }) 
                  }
                  </tbody>
                  </table>
          </div>
          </React.Fragment>
    )
  } 
}

export default OneWay;