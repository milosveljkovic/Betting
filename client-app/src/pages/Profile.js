import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../App';
import { thunk_action_getTicket } from '../store/actions/ticket.actions';
import { thunk_action_extraCredit } from '../store/actions/user.actions';
import './CurrentTicket.css'

class Profile extends React.Component{

    getTicket = (ticket_id) => {
        store.dispatch(thunk_action_getTicket(ticket_id))
    }

    getBonus = (email) => {
        store.dispatch(thunk_action_extraCredit(email));
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
                                    <div style={{fontSize:"20px", fontWeight:"300"}}>{user.age}</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"300"}}>{user.email}</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"300"}}>{user.credit.$numberDecimal}</div>
                                </div>
                            </div>
                        </div>
                        { user.has_extra_credit == true?
                        <div style={{margin:"40px"}}>
                            <p style={{marginBottom: "1px"}}>
                                We decide to reward you. Collect your 500 credits!
                            </p>
                            <button 
                            onClick={() => this.getBonus(user.email)} 
                            className="btn btn-primary  collectBonusBtn">
                                Collect bonus
                            </button>
                        </div>
                        :
                        null
                        }
                        <div className="row mt-5">
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"300"}}>Code</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"300"}}>Total odd</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"20px", fontWeight:"300"}}>Possible profit</div>
                                </div>
                            </div>
                        <div className="card p-2 mt-2">
                            {
                                user.my_tickets.map(ticket => {
                                    return(
                                        <div key={ticket._id} className="row">
                                            <div className="col">
                                            <Link to={`/ticket/${ticket.ticket_id}`} 
                                            style={{color: '#000000', textDecoration: 'none'}} 
                                            className="col" onClick={() => this.getTicket(`${ticket.ticket_id}`)}>
                                               <span style={{textDecoration: 'underline'}}> 
                                                   {ticket.code}
                                               </span>
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
        user:state.current_user
    }
}

export default connect(mapStateToProps,null)(Profile);