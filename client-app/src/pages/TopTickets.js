import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunk_action_getTopTickets } from '../store/actions/top-tickets.actions';
import {store} from '../App'
import { thunk_action_getTicket } from '../store/actions/ticket.actions';


class TopTickets extends React.Component{

    componentDidMount=()=>{
        store.dispatch(thunk_action_getTopTickets())
    }

    getTicket = (ticket_id) => {
        store.dispatch(thunk_action_getTicket(ticket_id))
    }

    render(){ 
        const {topTickets} = this.props;
        return(
            <div className="container text-center">
                {
                    topTickets!==null?
                    <div>
                                         
                        <h1 className="my-2">
                            Top tickets
                        </h1>
                        <div className="row mt-5">
                                <div className="col-2">
                                    <div style={{fontSize:"20px", fontWeight:"bold"}}>#</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"bold"}}>Code</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"bold"}}>Total odd</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"bold"}}>Possible profit</div>
                                </div>
                            </div>
                        <div className="card p-2 mt-2">
                            {
                                topTickets.map((ticket, id=1) => {
                                    return(
                                        <div key={ticket._id} className="row">
                                            <div className="col-2">
                                                {++id}
                                            </div>
                                            <div className="col">
                                            <Link to={`/ticket/${ticket._id}`} style={{color: '#000000', textDecoration: 'none'}} className="col" onClick={() => this.getTicket(`${ticket._id}`)}>
                                                {ticket.code}
                                            </Link>
                                            </div>
                                            <div className="col">
                                                {parseFloat(ticket.total_odd.$numberDecimal).toFixed(2)}
                                            </div>
                                            <div className="col">
                                                {parseFloat(ticket.possible_profit.$numberDecimal).toFixed(2)}
                                            </div>
                                            <hr/>
                                        </div>
                                    )
                                })
                            }
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
        topTickets: state.topTickets
    }
}

export default connect(mapStateToProps,null)(TopTickets);