import React from 'react';
import './matchlist.css'
import ButtonOdd from '../buttons/ButtonOdd'
import { Link } from 'react-router-dom';
import { store } from '../../App';
import { thunk_action_getTeam } from '../../store/actions/team.actions';


class List extends React.Component{

    getTeam = (team_id) => {
        store.dispatch(thunk_action_getTeam(team_id))
    }

    render(){
        return(
            <div className="container "> 
                <div className="container matchtable">
                    <div className="row">
                        <div className="col">
                        Home
                        </div>
                        <div className="col">
                        Away
                        </div>
                        <div className="col">
                        1
                        </div>
                        <div className="col">
                        X
                        </div>
                        <div className="col">
                        2
                        </div>
                    </div>
                {
                this.props.match_list.map((match)=>{
                   return (
                    <div className="row rowstyle" key={match._id}>
                        <Link to={`/team/${match.team1.team_id}`} style={{color: '#000000', textDecoration: 'none'}} className="col" onClick={() => this.getTeam(`${match.team1.team_id}`)}>
                                {match.team1.name}
                        </Link>
                        <Link to={`/team/${match.team2.team_id}`} style={{color: '#000000', textDecoration: 'none'}} className="col" onClick={() => this.getTeam(`${match.team2.team_id}`)}>
                            {match.team2.name}
                        </Link>
                        <div className="col">
                            <ButtonOdd match={match} position={0} canAddOdd={localStorage.getItem("user_id")?false:true}/>
                        </div>
                        <div className="col">
                            <ButtonOdd match={match} position={1} canAddOdd={localStorage.getItem("user_id")?false:true}/>
                        </div>
                        <div className="col">
                            <ButtonOdd match={match} position={2} canAddOdd={localStorage.getItem("user_id")?false:true}/>
                        </div>
                    </div>
                        )
                    })
                }  
                </div>
            </div>
        )
    }
}

export default List;