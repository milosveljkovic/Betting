import React from 'react';
import {Link } from 'react-router-dom'
import './navbar.css'

class Navbar extends React.Component {

    handleLogout = () =>{
        console.log('handleLogout');
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="betting">Betting</p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
          
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                </ul>
                    <li className="nav-link ">
                        <Link to="/login" className='myLink'>
                            Login
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/register" className='myLink'>
                            Register
                        </Link>
                    </li>
                <div onClick={this.handleLogout} className="btn btn-primary  my-2 my-lg-0 logoutBtn">
                            Logout
                 </div>
                </div>
          </nav>
        )
    }
}

export default Navbar;