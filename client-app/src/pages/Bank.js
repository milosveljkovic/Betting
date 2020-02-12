import React from 'react';
import { addUserCredit } from "../store/services/service.user"
import { connect } from 'react-redux';

class Bank extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            email: "",
            credit: 0
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    addCredit=()=>{
        const {email, credit} = this.state;
        const {user} = this.props;

        if(user.is_admin == true) {
            addUserCredit(email,credit);
        }

        this.setState({email : ''});
        this.setState({credit : 0});

    }

    render(){ 
        const {email, credit} = this.state;
        return(
            <div className="container text-center">
                    <div>                   
                        <h1 className="my-2">
                            Bank
                        </h1>
                        <div className="card mt-5 p-2">
                            <h5 className="col mt-2">
                                Email : 
                                <input onChange={this.onChange} type="text" name="email" className="form-control inputStyle" placeholder="Please insert user email" value={email} required/>
                            </h5>
                            <h5 className="col mt-2">
                                Credit : 
                                <input onChange={this.onChange} type="text" name="credit" className="form-control inputStyle" placeholder="Please insert user email" value={credit} required/>
                            </h5>
                            <button 
                                onClick={this.addCredit} 
                                className="btn btn-primary my-2 align-self-center" style={{width:"100px"}}>
                                        Add credit
                            </button>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user:state.current_user
    }
}

export default connect(mapStateToProps,null)(Bank);