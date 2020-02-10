import React from 'react';
import {Link } from 'react-router-dom'
import './navbar.css'
import {connect} from 'react-redux'

class Navbar extends React.Component {

    handleLogout=()=>{
        localStorage.clear();
        window.location.reload(true);
      }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="betting">Betting
                {
                    this.props.current_user?
                    this.props.current_user.credit.$numberDecimal!==undefined?
                    <span style={{"fontSize":"15px","marginLeft":"10px"}}>
                        Credit : {this.props.current_user.credit.$numberDecimal} rsd
                    </span>
                    :
                    null
                    :
                    null
                }
                </p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
        current_user:state.current_user
    }
  }
  
  
  export default connect(mapStateToProps,null)(Navbar);