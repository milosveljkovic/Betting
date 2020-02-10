//import '../../design/myDesign.css'

import React from 'react';
import './matchlist.css'
import ButtonOdd from '../buttons/ButtonOdd'
//import {Football} from '../../models/Football'

//import ButtonOdd from '../buttons/ButtonOdd'

// interface Props{
//     match_list:Football[]
// }

// interface State{

// }

class List extends React.Component{
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
                        <div className="col">
                        {match.team1.name}
                        </div>
                        <div className="col">
                        {match.team2.name}
                        </div>
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