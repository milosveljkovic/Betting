import React, { Dispatch } from 'react';
import {Action } from 'redux';
import {connect} from 'react-redux';
import {addMatchToCurrentTicket,removeMatchFromCurrentTicket} from '../../store/actions/current-ticket.actions'
import {changeMatchIncludedOddsFootball,changeMatchIncludedOddsBasketball} from '../../store/actions/match.actions'
//import { Button } from 'react-bootstrap';
//import {Football} from '../../models/Football';
//import {TicketMatch} from '../../models/TicketMatch';

//import {updateFootballMatch} from '../../store/actions/footballActions'
//import {addMatchToTicket,removeMatchFromTicket} from '../../store/actions/ticketActions';

// interface Props{
//     position:number,
//     match:Football,
//     updateFootballMatch:Function,
//     addMatchToTicket:Function,
//     removeMatchFromTicket:Function
// }

// interface State{
//     buttonBackground:string
// }

class ButtonOdd extends React.Component{

    constructor(props){
        super(props);
        this.state={
            buttonBackground:"#C0C0C0"
        }
    }

    setTicketMatch=(match,position)=>{
        var ticketMatch={
            match_id:match._id,
            team1:match.team1.name,
            team2:match.team2.name,
            date_of_match:match.date_of_match,
            odds:[{
                odd : match.odds[position].odd.$numberDecimal,
                final_score : match.odds[position].final_score
            }
            ]
        }
        return ticketMatch;
    }

    handleClick=()=>{
        const {match,position} = this.props;
        var matchVar=match;
        if(!match.odds[position].included_odds){
            matchVar.odds[position].included_odds=true;

            var ticketMatch;
            ticketMatch=this.setTicketMatch(match,position);
            this.props.addMatchToCurrentTicket(ticketMatch);
            this.setState({buttonBackground:"#92D67D"});

        }else{
            matchVar.odds[position].included_odds=false;
            console.log(match._id);
            this.props.removeMatchFromCurrentTicket(match._id)
            this.setState({buttonBackground:"#C0C0C0"});
        }
        if(match.sport==='football'){
            this.props.changeMatchIncludedOddsFootball(matchVar);
        }else {
            this.props.changeMatchIncludedOddsBasketball(matchVar);
        }
    }

    render(){

        const {buttonBackground}=this.state;
       const {position,match,canAddOdd}=this.props;
        return(
            <div>
            {
                match.odds[position].included_odds===false?
                <button 
                disabled={canAddOdd}
                className="btn btn-primary oddBtn" 
                onClick={this.handleClick} variant="outline-success"
                style={{backgroundColor:buttonBackground}}>
                    {match.odds[position].odd.$numberDecimal}
                </button>
                :
                <button 
                disabled={canAddOdd}
                className="btn btn-primary oddBtn" 
                onClick={this.handleClick}variant="outline-success"
                style={{backgroundColor:"#92D67D"}}>
                    {match.odds[position].odd.$numberDecimal}
                </button>
            }
            </div>
        )
    }
}

function mapDispatcherToProps(dispatch){
    return{
        addMatchToCurrentTicket:(ticketMatch)=>dispatch(addMatchToCurrentTicket(ticketMatch)),
        changeMatchIncludedOddsFootball:(match)=>dispatch(changeMatchIncludedOddsFootball(match)),
        changeMatchIncludedOddsBasketball:(match)=>dispatch(changeMatchIncludedOddsBasketball(match)),
        removeMatchFromCurrentTicket:(ticketMatchId)=>dispatch(removeMatchFromCurrentTicket(ticketMatchId))
    }
}

export default connect(null,mapDispatcherToProps)(ButtonOdd);