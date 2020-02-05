import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Route,Router} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'

import routes from './routes'
import history from './history';


class App extends React.Component {

  getRoutes = (routes) =>{

    return routes.map((prop, key) => {
        return (
          <Route path={prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  }


  render(){
  return (
    //<Provider store={store}> 
    <div>
      
      <Router history={history}>
        <Navbar/>
        <div className='content-div'>
          <Sidebar/>
            <div id="wrapper" style={{'marginLeft':'64px'}}>
          <Switch>
            <Route exact path="/" component={Home}/>
            {
              this.getRoutes(routes)
            }
          </Switch>
            </div>
        </div>
      </Router>
    </div>
   // </Provider>
  );
  }
}  

export default App;
