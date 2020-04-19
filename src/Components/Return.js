import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Main.css';

/**
 * Return Component
 *  - rendered if the user has searched for a return flight (i.e. isReturn is true)
 */

class Return extends React.Component {

    render() {
        return (
            <React.Fragment>
            <div class="container"> 
            <div class="row">
            <div class="col-sm-8 aligncenter gridbordergrey whitebackground">
            <h3>{this.props.details.origin} > {this.props.details.dest} > {this.props.details.origin}</h3>
            </div>
            <div class="col-sm-4 aligncenter gridbordergrey whitebackground">
            <p>Depart: {this.props.details.departString}<br/>
                Return: {this.props.details.returnString}
            </p>
            </div>
            </div>
            </div>
            <br/>
            
            <div class="table-responsive">
                    <table class="table">
                    <tbody>
                    {this.props.first.map(flight => {
                        return  (<tr key={Math.random()}>
                                    <td>
                                        <div className="depart_flight">
                                        <h5>${flight.totalPrice}</h5>
                                        <p>{flight.origin.flightNo}</p>
                                        <h6>{flight.origin.originCode} > {flight.origin.destCode}</h6>
                                        <h6>Depart: {flight.origin.departString}</h6>
                                        <h6>Arrive: {flight.origin.arriveString}</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="return_flight">
                                        <h5><br/></h5>
                                        <p>{flight.dest.flightNo}</p>
                                        <h6>{flight.dest.originCode} > {flight.dest.destCode}</h6>
                                        <h6>Depart: {flight.dest.departString}</h6>
                                        <h6>Arrive: {flight.dest.arriveString}</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{textAlign : "center"}}>
                                
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

export default Return;