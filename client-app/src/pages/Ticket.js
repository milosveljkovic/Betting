import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class Ticket extends React.Component{

    render(){ 
        const {ticket} = this.props;
        return(
            <div className="container">
                {
                    ticket!==null?
                    <div>
                        <div className="row mt-4 px-3">              
                            <h5 className="col">
                                Code : {ticket.code}
                            </h5>
                            <h5 className="ml-auto pr-3">
                                Date : <Moment format="DD-MM-YYYY HH:mm">{ticket.date}</Moment>
                            </h5>
                        </div>
                        <div className="card mt-2 px-4">
                            {
                                ticket.matches.map(match => {
                                    return(
                                        <div className="row my-3 px-3">
                                            <div className="col-3">
                                                <Moment format="DD-MMM HH:mm">{match.date_of_match}</Moment>
                                            </div>
                                            <div className="col-7">
                                                {match.team1} - {match.team2}
                                            </div>
                                            <div className="col-2">
                                                {match.odds.map(odd => {return (
                                                    <div className="row">
                                                        <div className="col">
                                                            {odd.final_score}
                                                        </div>
                                                        <div className="col">
                                                            {odd.odd.$numberDecimal}
                                                        </div>
                                                    </div>  
                                                )})}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row mt-3 px-3">              
                            <h5 className="col">
                                Total odd: {ticket.total_odd.$numberDecimal}
                            </h5>
                            <h5 className="ml-auto pr-3">
                                Possible profit : {ticket.possible_profit.$numberDecimal}
                            </h5>
                        </div>
                        <div className="row mt-1 px-3">              
                            <h5 className="col">
                                Payment: {ticket.payment.$numberDecimal}
                            </h5>
                        </div>
                    </div>
                    :
                    'There is now info about team'
                }
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        ticket:state.ticket
    }
}

export default connect(mapStateToProps,null)(Ticket);