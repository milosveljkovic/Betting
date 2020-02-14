import React from 'react';
import '../match-list/matchlist.css'
import { Link } from 'react-router-dom';
import { store } from '../../App';
import { thunk_action_getTeam } from '../../store/actions/team.actions';


class ShowResult extends React.Component{ 

    getTeam = (team_id) => {
        store.dispatch(thunk_action_getTeam(team_id))
    }

    render(){
        return(
            <div > 
                {
                this.props.matches.map((match)=>{
                   return (
                    <div className="row rowstyle" key={match._id}>
                        <Link to={`/team/${match.team1.team_id}`} style={{color: '#000000', textDecoration: 'none'}} className="col" onClick={() => this.getTeam(`${match.team1.team_id}`)}>
                               <span > {match.team1.name} </span>
                        </Link>
                        <Link to={`/team/${match.team2.team_id}`} style={{color: '#000000', textDecoration: 'none'}} className="col" onClick={() => this.getTeam(`${match.team2.team_id}`)}>
                                <span >{match.team2.name} </span>
                        </Link>
                        <div className="col">
                            
                        </div>
                        <div className="col">
                            {match.team1_score} - {match.team2_score}
                        </div>
                        <div className="col">
                            
                        </div>
                    </div>
                        )
                    })
                }  
            </div>
        )
    }
}

export default ShowResult;