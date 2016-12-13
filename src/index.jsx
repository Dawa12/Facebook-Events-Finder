import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import necessary components
import Home from './components/Home/Home.jsx'
import Events from './components/Events/Events.jsx'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Home} />
    {/* <Route path='/' component={Home} /> */}
    <Route path='/events' component={Events} />


    {/* Only use closing route tag when route has a child route */}
    {/* <Route></Route> */}
  </Router>
), document.querySelector('#root-container'));

// ReactDOM.render(<Home />, document.querySelector('#root-container'))
