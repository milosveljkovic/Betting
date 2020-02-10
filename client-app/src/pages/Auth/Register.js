import React, { Component } from 'react';
import './login.css'
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom';
import './login.css'
import {setLoading,unsetLoading} from '../../store/actions/loading-indicator.actions'
import {connect} from 'react-redux'
import {registerNewUser} from '../../store/services/service.user'


class Register extends Component {    

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            email:"",
            age:18,
            userNameError:false,
            passwordError:false,
            emailError:false,
            ageError:false
         }
    }


    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

    handleAgeChange=(event)=>{
        const age=Number(event.target.value);
        this.setState({'age':age})
    }

    checkInput=()=>{
        const {username,password,email,age} = this.state;
        var noError=true;

        if(username.length < 6){
            this.setState({"userNameError":true})
            noError=false;
        }else {
            this.setState({"userNameError":false})
        }

        if(password.length< 6){
            this.setState({"passwordError":true})
            noError=false;
        }else {
            this.setState({"passwordError":false})
        }

        if(email.length< 6){
            this.setState({"emailError":true})
            noError=false;
        }else {
            this.setState({"emailError":false})
        }

        if(age===0){
            this.setState({"ageError":true})
            noError=false;
        }else {
            this.setState({"ageError":false})
        }

        return noError;
    }

    handleSubmit=()=>{
        const {username,password,email,age} = this.state;
         if(this.checkInput()){

            const userInfo = {
                username:username,
                password:password,
                email:email,
                age:age,
                is_admin:false,
                credit:0
            }
            console.log(userInfo);
        
            this.props.setLoading();
            setTimeout(() => {
                registerNewUser(userInfo).then(response=>{
                    if(response.status===200){
                        Swal.fire('Register success','','success')
                        this.props.unsetLoading();
                    }else {
                        console.log(response);
                        Swal.fire('Error',response,'error')
                        this.props.unsetLoading();
                    }
                })
            }, 1000);
        }
    }

  render () {
    const {username,password,email,age,userNameError,passwordError,emailError,ageError} = this.state;

    if(localStorage.getItem("user_id"))
    {
        return <Redirect to="/home" />
    }

    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <h3 className='title'>Registration</h3>
            <form className="mb-3">
                <div className="form-row mt-3">
                    <div className="col">
                        <label className='label'>Username*:</label>
                        <input onChange={this.onChange} type="text" name="username" className="form-control" id="validationCustom01" placeholder="Username" value={username} required/>
                        {
                            userNameError?
                            <small  style={{"color":"red"}}>Username must contain at least 6 characters!</small>
                            :
                            <small style={{"height":"20px","display":"block"}}/>
                        }
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col">
                        <label className='label'>Email*:</label>
                        <input onChange={this.onChange} type="text" name="email" className="form-control" id="validationCustom01" placeholder="Email" value={email} required/>
                        {
                            emailError?
                            <small  style={{"color":"red"}}>Email must contain at least 6 characters!</small>
                            :
                            <small style={{"height":"20px","display":"block"}}/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label className='label'>Password*:</label>
                        <input onChange={this.onChange} type="password" className="form-control" id="inputPassword" placeholder="Password"
                        value={password} name="password" required/>
                        {
                            passwordError?
                            <small  style={{"color":"red"}}>Password must contain at least 6 characters!</small>
                            :
                            <small style={{"height":"20px","display":"block"}}/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label className='label'>Age:</label>
                        <input onChange={(e)=>this.handleAgeChange(e)} type="number" min={18} className="form-control" id="inputAge" placeholder="age..."
                        value={age} name="age" required/>
                    {
                            ageError?
                            <small  style={{"color":"red"}}>You should be adult.</small>
                            :
                            <small style={{"height":"20px","display":"block"}}/>
                    }
                    </div>
                </div>
            </form>
            {!this.props.loading && <button className="btn btn-primary loginBtn" onClick={this.handleSubmit}>Register</button>}
            {this.props.loading && <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
            </div>}
            <small className="ml-3 label">Already a user? <Link to="/login">Login</Link></small>
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        loading:state.loading_indicator
    }
}

function mapDispatchToProps(dispatch){
    return{
        setLoading: () => (dispatch(setLoading())),
        unsetLoading: () => (dispatch(unsetLoading()))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Register);