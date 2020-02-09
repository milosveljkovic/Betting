import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import './login.css'
import {thunk_action_loginWithEmailAndPass} from '../../store/actions/user.actions'
import {setLoading} from '../../store/actions/loading-indicator.actions'
import {store} from '../../App'
import {connect} from 'react-redux'

class Login extends Component {    

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            emailError:false,
            emailCorrect:false,
            passwordError:false,
            passwordCorrect:false
         }
    }

    checkEmail=(email)=>{
        if(email.length<=6){
            this.setState({"emailError":true})
            return false;
        }
        this.setState({"emailError":false})
        return true;
    }

    checkPassword=(password)=>{
        if(password.length<=6){
            this.setState({"passwordError":true})
            return false;
        }
        this.setState({"passwordError":false})
        return true;
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
        if(this.state.email.length>=6){
            this.setState({"emailCorrect":true})
        }else {
            this.setState({"emailCorrect":false})
        }
        if(this.state.password.length>=6){
            this.setState({"passwordCorrect":true})
        }else {
            this.setState({"passwordCorrect":false})
        }
     }

    handleSubmit=()=>{
        const {email,password} = this.state;
        if(this.checkEmail(email) && this.checkPassword(password)){
            const credentials = {
                email:email,
                password:password
            }
            this.props.setLoading();
            setTimeout(() => {
                store.dispatch(thunk_action_loginWithEmailAndPass(credentials))
            }, 1000);
        }

    }

  render () {
    const {email,password,passwordError,emailError,emailCorrect,passwordCorrect} = this.state;

    if(localStorage.getItem("user_id"))
    {
        return <Redirect to="/home" />
    }

    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <h3 className='title'>Login</h3>
            <form className="mb-3">
                <div className="form-row">
                    <div className="col">
                        <label className='label'>Email*:</label>
                        <input  onChange={this.onChange} type="text" name="email" className="form-control " id="validationCustom01" placeholder="Email" value={email} required/>
                    {
                        emailError?
                        <small  style={{"color":"red"}}>Email must contain at least 8 characters!</small>
                        :
                        emailCorrect?
                        <small  style={{"color":"green"}}>Looks good!</small>
                        :
                        <small style={{"height":"20px","display":"block"}}/>
                    }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label  className='label'>Password*:</label>
                        <input onChange={this.onChange} type="password" className="form-control" id="inputPassword" placeholder="Password"
                        value={password} name="password" required/>
                    {
                        passwordError?
                        <small style={{"color":"red"}}>Password must contain at least 8 characters!</small>
                        :
                        passwordCorrect?
                        <small  style={{"color":"green"}}>Looks good!</small>
                        :
                        <small style={{"height":"20px","display":"block"}}/>
                    }
                    </div>
                </div>
            </form>
            {!this.props.loading && <button className="btn btn-primary loginBtn" onClick={this.handleSubmit}>Login</button>}
            {this.props.loading && <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
            </div>}
            <small className='ml-3 label'>Don't have an account? <Link to="/register">Register</Link></small>
            {
            this.props.current_user===null?
            <div  style={{"color":"red"}}>
                Change your email or password. And try again.
            </div>
            :
            <p/>
            }
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        current_user:state.current_user,
        loading:state.loading_indicator
    }
}

function mapDispatchToProps(dispatch){
    return{
        setLoading: () => (dispatch(setLoading()))
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(Login);