import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './CurrentTicket.css'

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

    render(){ 
        const {code,payment,total_odd,possible_profit} = this.state;
        return(
            <div className="container">
                {
                    // ticket!==null?
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
                }
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        current_ticket:state.current_ticket,
        current_user:state.current_user
    }
}

export default connect(mapStateToProps,null)(CurrentTicket);