import React from 'react';
import {Link } from 'react-router-dom'
import './navbar.css'
import {connect} from 'react-redux'
import {setLoading,unsetLoading} from '../../store/actions/loading-indicator.actions'
import {thunk_action_generateMatchResults,thunk_action_refreshMatches} from '../../store/actions/match.actions'

class Navbar extends React.Component {

    handleLogout=()=>{
        localStorage.clear();
        window.location.reload(true);
      }

      handleRefresh=()=>{
        this.props.setLoading();

        setTimeout(() => {
            this.props.thunk_action_refreshMatches();
        }, 1000);
      }

      handleGenerate=()=>{
            //@TO-DO: generate 
            this.props.setLoading();

            setTimeout(() => {
                this.props.thunk_action_generateMatchResults();
            }, 1000);
      }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="betting">Betting
                </p>
                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                </ul>
                    {
                    !localStorage.getItem("user_id")?
                    <li className="nav-link ">
                        <Link to="/login" className='myLink'>
                            Login
                        </Link>
                    </li>
                    :
                    null
                    }
                    {
                    !localStorage.getItem("user_id")?
                    <li className="nav-link">
                        <Link to="/register" className='myLink'>
                            Register
                        </Link>
                    </li>
                    :
                    null
                    }
                    <div className="m-auto">
                    <button 
                    disabled={this.props.loading}
                    onClick={this.handleGenerate} 
                    className="btn btn-primary  my-2 my-lg-0 otherBtn">
                                Generate
                                <i className='fa fa-upload refreshIcon'></i>
                    </button>
                    <button 
                    disabled={this.props.loading}
                    onClick={this.handleRefresh} 
                    className="btn btn-primary  my-2 my-lg-0 otherBtn">
                                Refresh
                                {
                                    this.props.loading===false?
                                    <i className='fa fa-refresh refreshIcon faa-flash animated'></i>
                                    :
                                    <i className='fa fa-refresh refreshIcon fa-spin'></i>
                                }
                    </button>
                    </div>
                    {
                    this.props.current_user?
                    this.props.current_user.credit.$numberDecimal!==undefined?
                    <span style={{"fontSize":"15px","marginLeft":"10px"}} className="mr-4">
                        Credit : <strong>{this.props.current_user.credit.$numberDecimal}</strong> rsd
                    </span>
                    :
                    null
                    :
                    null
                }
                    {
                    localStorage.getItem("user_id")?
                    <div onClick={this.handleLogout} className="btn btn-primary  my-2 my-lg-0 logoutBtn">
                                Logout
                    </div>
                    :
                    null
                    }
                </div>
          </nav>
        )
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
        setLoading: () => (dispatch(setLoading())),
        unsetLoading: () => (dispatch(unsetLoading())),
        thunk_action_generateMatchResults:()=>(dispatch(thunk_action_generateMatchResults())),
        thunk_action_refreshMatches:()=>(dispatch(thunk_action_refreshMatches()))
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Navbar);