import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { thunk_action_updateIfIsWinning } from '../store/actions/ticket.actions';
import { store } from '../App';

class Ticket extends React.Component{

    constructor(props){
        super(props);
        this.state={
            winning_ticket: ''
        }
    }

    handleCheck = (ticket_id, user_id) => {
        store.dispatch(thunk_action_updateIfIsWinning(ticket_id,user_id));

    }

    render(){ 
        const {ticket, user} = this.props;
        var user_tickets = user.my_tickets.map(ticket => ticket.ticket_id);
        return(
            <div className="container">
                {
                    ticket!==null?
                    <div>
                        <div className="row mt-4 px-3">              
                            <h5 className="col textStyle">
                                Code : {ticket.code}
                            </h5>
                            <h5 className="ml-auto pr-3 textStyle">
                                Date : <Moment format="DD-MM-YYYY HH:mm">{ticket.date}</Moment>
                            </h5>
                        </div>
                        <div className={ticket.is_winning_ticket===undefined?"card mt-2 px-4"
                        :
                        ticket.is_winning_ticket==true?
                        "card border-success mt-2 px-4"
                        :
                        "card border-danger mt-2 px-4"}>
                            {
                                ticket.matches.map(match => {
                                    return(
                                        <div className="row my-3 px-3" key={match._id}>
                                            <div className="col-3">
                                                <Moment format="DD-MMM HH:mm">{match.date_of_match}</Moment>
                                            </div>
                                            <div className="col-7">
                                                {match.team1} - {match.team2}
                                            </div>
                                            <div className="col-2">
                                                {match.odds.map(odd => {return (
                                                    <div className="row" key={odd._id}>
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
                            <h5 className="col textStyle">
                                Total odd: {parseFloat(ticket.total_odd.$numberDecimal).toFixed(2)}
                            </h5>
                            <h5 className="ml-auto pr-3 textStyle">
                                Possible profit : {parseFloat(ticket.possible_profit.$numberDecimal).toFixed(2)}
                            </h5>
                        </div>
                        <div className="row mt-1 px-3 ">              
                            <h5 className="col textStyle">
                                Payment: {ticket.payment.$numberDecimal}
                            </h5>
                        </div>
                        
                        { user_tickets.includes(ticket._id)?
                            ticket.is_winning_ticket === undefined?
                        <div>
                            <button 
                            onClick={() => this.handleCheck(ticket._id, user._id)} 
                            className="btn btn-primary my-2 ml-3 checkTicket">
                                Check ticket
                            </button>
                        </div>
                        :
                        <div>
                            <button disabled className="btn btn-primary my-2 ml-3">
                                Ticket checked
                            </button>
                        </div>
                        :
                        null
                        }
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
        ticket: state.ticket,
        user: state.current_user
    }
}

export default connect(mapStateToProps,null)(Ticket);