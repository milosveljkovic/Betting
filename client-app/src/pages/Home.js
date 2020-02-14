import React ,{Dispatch} from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{

    render(){ 
        return(
            <div className="container text-center">
                    <h1  style={{fontSize:"60px", marginTop:"100px"}}>
                        Online Betting
                    </h1>
                    <div className="d-flex justify-content-center mt-5">
                    <Link to="/sport/football" style={{textDecoration: 'none'}}>
                    <div className="card text-white bg-success mb-3" style={{ width:"18rem"}}>
                        <div className="card-header">Football</div>
                        <div className="card-body">
                        <i className="fa fa-futbol-o" style={{fontSize: '5em' }} ></i>
                        </div>
                    </div>
                    </Link>
                    <Link to="/sport/basketball" style={{textDecoration: 'none'}}>
                    <div className="card text-white bg-danger mb-3 ml-5" style={{ width:"18rem"}}>
                        <div className="card-header">Basketball</div>
                        <div className="card-body">
                        <i className="fa fa-futbol-o" style={{fontSize: '5em' }} ></i>
                        </div>
                    </div>
                    </Link>
                    </div>
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