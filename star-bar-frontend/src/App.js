import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { render } from '@testing-library/react';

class App extends React.Component {

  state = {
    user: null
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
    .then(console.log)
  }

  render() {
    return (
      <div className="App">
        <Signup signupHandler={this.signupHandler}/>
        <Login loginHandler={this.loginHandler}/>
      </div>
    )
  }
  
  
}

export default App;

