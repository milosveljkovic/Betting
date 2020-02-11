import React from 'react';
import { connect } from 'react-redux';

class Team extends React.Component{

    render(){ 
        const {team} = this.props;
        return(
            <div className="container text-center">
                {
                    team!==null?
                    <div>
                        <img className="mt-4" style={{height:"300px",maxWidth:"100%"}}
                                src={team.logo_url}
                                alt="Team logo"></img>                    
                        <h1 className="my-2">
                            {team.name}
                        </h1>
                        <div className="card mt-5 p-2">
                            <div className="row">
                                <div className="col">
                                    <div style={{fontSize:"24px"}}>Wins</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"24px"}}>Draws</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"24px"}}>Losses</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div style={{fontSize:"30px", fontWeight:"bold"}}>{team.number_of_wins}</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"30px", fontWeight:"bold"}}>{team.number_of_draws}</div>
                                </div>
                                <div className="col">
                                    <div style={{fontSize:"30px", fontWeight:"bold"}}>{team.number_of_losses}</div>
                                </div>
                            </div>
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
        team:state.team
    }
}

export default connect(mapStateToProps,null)(Team);