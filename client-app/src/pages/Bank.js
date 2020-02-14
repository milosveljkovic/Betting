import React from 'react';
import { addUserCredit } from "../store/services/service.user"
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class Bank extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            email: "",
            credit: 0,
            creditError: '',
            emailError: ''
         }
    }

    checkInput=()=>{
        const {email,credit} = this.state;
        var noError = true;

        if(credit === 0){
            this.setState({"creditError":true})
            noError = false;
        }else {
            this.setState({"creditError":false})
        }

        if(email.length< 6){
            this.setState({"emailError":true})
            noError = false;
        }else {
            this.setState({"emailError":false})
        }

        return noError;
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    addCredit=()=>{
        const {email, credit} = this.state;
        const {user} = this.props;
        if(this.checkInput()){
            if(user.is_admin == true) {
                addUserCredit(email,credit).then(response => {
                    if(response.status===200){
                        Swal.fire('Credit added to user ' + email,'','success')
                    }
                    else 
                    {
                        Swal.fire('Error, try again!',response,'error')
                    }
                })
            }

            this.setState({email : ''});
            this.setState({credit : 0});
        }
    }

    render(){ 
        const {email, credit, emailError, creditError} = this.state;
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
                                {
                                    emailError?
                                    <small  style={{"color":"red"}}>Email must contain at least 6 characters!</small>
                                    :
                                    <small style={{"height":"20px","display":"block"}}/>
                                }
                            <h5 className="col mt-2">
                                Credit : 
                                <input onChange={this.onChange} type="number" name="credit" className="form-control inputStyle" placeholder="Please insert user email" value={credit} required/>
                            </h5>
                                {
                                    creditError?
                                    <small  style={{"color":"red"}}>Credit must be higher than 0!</small>
                                    :
                                    <small style={{"height":"20px","display":"block"}}/>
                                }
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