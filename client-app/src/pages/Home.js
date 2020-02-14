import React ,{Dispatch} from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{

    render(){ 
        return(
            <div className="container text-center">
                    <h1 className='topTicketTitle' style={{marginTop:'40px'}}>
                        Online Betting
                    </h1>
                    <div className="d-flex justify-content-center mt-5">
                    <Link to="/sport/football" style={{textDecoration: 'none'}}>
                    <div className="card " style={{ width:"500px"}}>
                        <div className="card-header" style={{color:'#db3d44',backgroundColor: 'white'}}>Football</div>
                        <img src='https://cdn.civitatis.com/argentina/buenos-aires/galeria/maradona.jpg' 
                       className="w-100"
                        />
                    </div>
                    </Link>
                    <Link to="/sport/basketball" style={{textDecoration: 'none'}}>
                    <div className="card " style={{ width:"500px"}}>
                        <div className="card-header" style={{color:'#db3d44',backgroundColor: 'white'}}>Basketball</div>
                        
                        <img src='https://d.newsweek.com/en/full/1562831/kobe-bryant-los-angeles-lakers.jpg' 
                       className="w-100"
                        />
                        
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