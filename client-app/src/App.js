import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Route,Router} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'

import rootReducer from './store/reducers/root.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import routes from './routes'
import history from './history';
import { thunk_action_getUserByIdAuth } from './store/actions/user.actions';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware, thunkMiddleware]

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

//sagaMiddleware.run(rootSaga);

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

    if(localStorage.getItem("user_id")){
      store.dispatch(thunk_action_getUserByIdAuth(localStorage.getItem("user_id")))
    }

  return (
    <Provider store={store}> 
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
   </Provider>
  );
  }
}  

export default App;
