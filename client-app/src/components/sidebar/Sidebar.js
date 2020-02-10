import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {Link } from 'react-router-dom'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            is_extended:false
        }
    }

    render(){
        const {is_extended}=this.state;
        return (
            <SideNav
            onToggle={(expanded) => {
                this.setState({is_extended:expanded})
                let wrapper=document.getElementById("wrapper");
                wrapper.style.marginLeft=expanded?'240px':'64px'
            }}
            >
                <Toggle/>
                <Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <Link to="/home" style={{color: '#ffffff', textDecoration: 'none'}}>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/home" style={{color: '#ffffff', textDecoration: 'none'}}>
                                Home
                            </Link> 
                        </NavText>
                    </NavItem>
                    <NavItem eventKey='sport'>
                        <NavIcon>
                        <i className="fa fa-futbol-o" style={{fontSize: '1.75em' }} ></i>
                        </NavIcon>
                        <NavText>
                            Sport
                        </NavText>
                        <NavItem eventKey="football">
                            <NavText>
                                <Link to="/sport/football" style={{color:is_extended?'#fff':'#db3d44',textDecoration: 'none'}}>
                                    Football
                                </Link> 
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="basketball">
                            <NavText>
                                <Link to="/sport/basketball" style={{color:is_extended?'#fff':'#db3d44',textDecoration: 'none'}}>
                                    Basketball
                                </Link> 
                            </NavText>
                        </NavItem>
                    </NavItem>
                </Nav>
            </SideNav>
        )
    }
}

export default Sidebar;