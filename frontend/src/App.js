import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import Home from './components/contentPages/Home';
import Profile from './components/contentPages/Profile';
import Search from './components/contentPages/Search';
import Filter from './components/contentPages/Filter';
import Review from './components/contentPages/Review';
import Login from './components/contentPages/Login';
import SignupForm from './components/contentPages/SignupForm';
import './App.css';
import React, { Component, useState } from 'react';
import Footer from './components/Footer/Footer';
import { Fragment } from 'react';
import ScrollButton from './components/Footer/ScrollButton';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Welcome from './components/contentPages/Welcome';



class App extends Component {
  state = {};
  componentDidMount() {
    const auth = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')},
    }

    axios.get('http://localhost:8080/api/user/user', auth).then( (user) => {
      this.setState({
        user: user.data,
      })
    })
     
  }

 render(){ 
   return (
    <div className='app'>
      <Router>
        <Topbar user={this.state.user} />
        <div className='app-container'>
          <Sidebar />
          <div className='page-container'>
            <Switch>
              <Route path="/" exact component={()=><Home user = {this.state.user}/>} />
              <Route path="/profile" component={()=><Profile user = {this.state.user}/>} />
              <Route path="/review" component={()=><Review user = {this.state.user}/>} />
              <Route path="/search" component={()=><Search user = {this.state.user}/>} />
              <Route path="/filter" component={()=><Filter user = {this.state.user}/>} />
              <Route path="/login" component={Login} /> 
              <Route path="/register" exact component={SignupForm} />
              <Route path="/welcome" exact component= {()=><Welcome user = {this.state.user}/>} />              
            </Switch>
          </div>
        </div>
      </Router>
      <Footer/>
      <ScrollButton />

    </div>
  );
}
}


export default App;