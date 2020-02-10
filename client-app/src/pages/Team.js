import React from 'react';
import { connect } from 'react-redux';

class Team extends React.Component{

    render(){ 
        const {team} = this.props;
        return(
            <div>
                {
                    team!==null?
                    <h1 className="text-center">
                        {team.name}
                    </h1>:
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