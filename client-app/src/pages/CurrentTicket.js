import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {thunk_action_playTicket} from '../store/actions/current-ticket.actions'
import './CurrentTicket.css'
import {setLoading} from '../store/actions/loading-indicator.actions'

class CurrentTicket extends React.Component{

    constructor(props){
        super(props);
        this.state={
            code:"",
            total_odd:0,
            payment:0,
            possible_profit:0
         }
    }

    componentDidMount=()=>{
        const {current_ticket} = this.props;
        var totalOdd=1;
        current_ticket.matches.map(match=>{
            totalOdd*=Number(match.odds[0].odd)
        })
        this.setState({total_odd:totalOdd});
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    onChangePayment=(event)=>{
        const new_payment=event.target.value
        this.setState({[event.target.name]:new_payment})
        var new_possible_proffit=new_payment*this.state.total_odd;
        this.setState({possible_profit:new_possible_proffit})

    }

    playTicket=()=>{
        const {current_ticket,current_user} = this.props;
        const {code,payment,total_odd,possible_profit} = this.state;

        var ticket ={
            user_id:current_user._id,
            ticket:{
                code:code,
                date:new Date(),
                matches:current_ticket.matches,
                payment:payment,
                total_odd:total_odd
            }
        }
        this.props.setLoading();
        setTimeout(() => {
            this.props.thunk_action_playTicket(ticket)
        }, 1000);
    }

    canPlay=()=>{
        const {current_ticket} = this.props;
        const {payment} = this.state;
        if(localStorage.getItem("user_id")){
            if(current_ticket.matches.length>0 && payment>0){
                return false
            }
        }
        return true
    }

    render(){ 
        const {code,payment,total_odd,possible_profit} = this.state;
        return(
            <div className="container">
                    <div>
                        <div className="row mt-4 px-3">              
                            <h5 className="col">
                                Code : 
                                <input onChange={this.onChange} type="text" name="code" className="form-control inputStyle" id="validationCustom01" placeholder="ticket name" value={code} required/>
                            </h5>
                            <h5 className="ml-auto pr-3">
                               
                            </h5>
                        </div>
                        <div className="card mt-2 px-4">
                            {
                                this.props.current_ticket.matches.map(match => {
                                    return(
                                        <div key={match.match_id} className="row my-3 px-3" >
                                            <div className="col-3">
                                                <Moment format="DD-MMM HH:mm">{match.date_of_match}</Moment>
                                            </div>
                                            <div className="col-7">
                                                {match.team1} - {match.team2}
                                            </div>
                                            <div className="col-2">
                                                {match.odds.map(odd => {return (
                                                    <div className="row" >
                                                        <div className="col">
                                                            {odd.final_score}
                                                        </div>
                                                        <div className="col">
                                                            {odd.odd}
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
                                Total odd: {total_odd}
                            </h5>
                            <h5 className="ml-auto pr-3">
                                Possible profit : {possible_profit}
                            </h5>
                        </div>
                        <div className="row mt-1 px-3">              
                            <h5 className="col">
                                Payment: 
                                <input 
                                onChange={this.onChangePayment} 
                                min={0} 
                                max={this.props.current_user.credit.$numberDecimal} 
                                type="number" 
                                name="payment" 
                                className="form-control inputStyle" 
                                id="validationCustom01"
                                 placeholder="" 
                                 value={payment} 
                                 required/>
                            </h5>
                        </div>
                    </div>
                    {!this.props.loading && 
                    <button 
                    disabled={this.canPlay()}
                    onClick={this.playTicket} 
                    className="btn btn-primary  my-2 my-lg-0 logoutBtn">
                                Play
                    </button>
                    }
                    {this.props.loading && <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                    </div>}
            </div>
        )
    }
}

function mapDispatcherToProps(dispatch){
    return{
        thunk_action_playTicket:(ticketMatch)=>dispatch(thunk_action_playTicket(ticketMatch)),
        setLoading:()=>dispatch(setLoading())
    }
}

function mapStateToProps(state){
    return{
        current_ticket:state.current_ticket,
        current_user:state.current_user,
        loading:state.loading_indicator
    }
}

export default connect(mapStateToProps,mapDispatcherToProps)(CurrentTicket);