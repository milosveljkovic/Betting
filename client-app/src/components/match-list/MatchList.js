import React from 'react';
import './matchlist.css'
import ButtonOdd from '../buttons/ButtonOdd'
import { Link } from 'react-router-dom';
import { store } from '../../App';
import {connect} from 'react-redux'
import { thunk_action_getTeam } from '../../store/actions/team.actions';
import ShowResult from '../ShowResult/ShowResult'

class List extends React.Component{ 

    getTeam = (team_id) => {
        store.dispatch(thunk_action_getTeam(team_id))
    }

    render(){
        const {loading} = this.props;
        return(
            <div className="container "> 
            {loading===false?
                <div className="container matchtable">
                    {
                    this.props.match_list[0].generated_score===false?
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
                    :  //if result is generated
                    <div className="row">
                        <div className="col">
                        Home
                        </div>
                        <div className="col">
                        Away
                        </div>
                        <div className="col">
                        
                        </div>
                        <div className="col">
                        Result
                        </div>
                        <div className="col">
                        
                        </div>
                    </div>
                    }
                {
                this.props.match_list[0].generated_score===false?
                this.props.match_list.map((match)=>{
                   return (
                    <div className="row rowstyle" key={match._id}>
                        <Link to={`/team/${match.team1.team_id}`} className="col" onClick={() => this.getTeam(`${match.team1.team_id}`)}>
                               <span className='teamName' style={{color: '#000000', textDecoration: 'none'}}> {match.team1.name} </span>
                        </Link>
                        <Link to={`/team/${match.team2.team_id}`} className="col" onClick={() => this.getTeam(`${match.team2.team_id}`)}>
                                <span className='teamName' style={{color: '#000000', textDecoration: 'none'}}>{match.team2.name} </span>
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
                    ://if result is generated
                    <ShowResult matches={this.props.match_list} />
                }  
                </div>
                :
                <div className="spinner-border text-danger spinnerStyle" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loading:state.loading_indicator
    }
  }

export default connect(mapStateToProps,null)(List);