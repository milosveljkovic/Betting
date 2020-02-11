import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../App';
import { thunk_action_getTicket } from '../store/actions/ticket.actions';

class Profile extends React.Component{

    getTicket = (ticket_id) => {
        store.dispatch(thunk_action_getTicket(ticket_id))
    }

    render(){ 
        const {user} = this.props;
        return(
            <div className="container text-center">
                {
                    user!==null?
                    <div>
                                         
                        <h1 className="mt-4">
                            {user.username}
                        </h1>
                        <div className="card mt-4 p-2">
                            <div className="row">
                                <div className="col">
                                    <div style={{fontSize:"24px"}}>Age</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"24px"}}>Email</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"24px"}}>Current credit</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div style={{fontSize:"24px", fontWeight:"bold"}}>{user.age}</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"24px", fontWeight:"bold"}}>{user.email}</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"24px", fontWeight:"bold"}}>{user.credit.$numberDecimal}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
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
                                user.my_tickets.map(ticket => {
                                    return(
                                        <div key={ticket._id} className="row">
                                            <div className="col">
                                            <Link to={`/ticket/${ticket.ticket_id}`} style={{color: '#000000', textDecoration: 'none'}} className="col" onClick={() => this.getTicket(`${ticket.ticket_id}`)}>
                                                {ticket.code}
                                            </Link>
                                            </div>
                                            <div className="col">
                                                {ticket.total_odd.$numberDecimal}
                                            </div>
                                            <div className="col">
                                                {ticket.possible_profit.$numberDecimal}
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
        user:state.current_user
    }
}

export default connect(mapStateToProps,null)(Profile);