import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { render } from '@testing-library/react';
import {Route, Switch, withRouter} from 'react-router-dom'
import Navbar from './Components/Navbar'
import HoroscopeContainer from './Containers/HoroscopeContainer'


class App extends React.Component {

  state = {
    user: null
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    if (token){
      fetch('http://localhost:3000/profile', {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(r => r.json())
      .then(data => this.setState({ user: data.user}))
    } 
  }

  signupHandler = (userObj) => {
  fetch('http://localhost:3000/users', {
    method: "POST",
    headers: {
      'content-type' : 'application/json'
      },
      body: JSON.stringify({user: userObj})
    })
      .then(r => r.json())
      .then(data => this.setState({ user: data.user}))
  }
  
  loginHandler = (userInfo)=>{
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        accepts: 'application/json',
        'content-type' : 'application/json'
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(r => r.json())
    .then(data => {
      // console.log('token:', data.jwt)
      // localStorage.setItem('token', data.jwt)
      this.setState({user: data.user}, () => this.props.history.push('/horoscopes'))
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/signup' render={() => <Signup signupHandler={this.signupHandler}/>} />
          <Route path='/login' render={() => <Login loginHandler={this.loginHandler}/>} />
          <Route path='/horoscopes' render={() => <HoroscopeContainer user={this.state.user} />}/>
        </Switch>
      </div>
    )
  }
  
  
}

export default withRouter(App);

