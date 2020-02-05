import React ,{Dispatch} from 'react';

class Home extends React.Component{

    render(){ 
        return(
            <div >
                    <h1 className="homeTitle">
                    THE BLIND CHICKEN SOMETIMES STABS.
                    </h1>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch:Dispatch<Action>){
//     return{
//         fetchMyTickets:(userId:number)=>dispatch(fetchMyTickets(userId))
//     }
// }

// function mapStateToProps(state:AppState){
//     console.log(state);
//     return{
//         user:state.user
//     }
// }

export default Home;