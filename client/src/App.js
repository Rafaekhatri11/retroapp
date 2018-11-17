import React, { Component } from 'react';
import Landingpage from './components/landingpage/landing';
import Createretro from './components/createretro/createretro';
import {BrowserRouter as Router,Route ,
  Link,
  Redirect,
  withRoute} from 'react-router-dom';
import {Provider } from 'react-redux';
import store from '../src/store/index';




class App extends Component {
  render() {
    return (

      <Provider store={store}>
      <Router >
        
    <div>
      <Route exact path="/" component={Landingpage}/>
      <Route path="/createretro" component={Createretro} />
            {/* <Createretro />   */}
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
