import logo from './logo.svg';
import './App.css';
import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { render } from '@testing-library/react';
import {Route, Switch, withRouter} from 'react-router-dom'
import Navbar from './Components/Navbar'
import HoroscopeContainer from './Containers/HoroscopeContainer'
import FavoriteHoroscopeContainer from './Containers/FavoriteHoroscopeContainer';


class App extends React.Component {

  state = {
    user: null,
    sign: ""
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    if (this.state.user && token){
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
      .then(data => this.setState({ user: data.user, sign: data.user.sign}, () => this.props.history.push('/horoscopes')))
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
      console.log(data.user)
      localStorage.setItem('token', data.jwt)
      this.setState({user: data.user, sign: data.user.sign}, () => this.props.history.push('/horoscopes'))
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/signup' render={() => <Signup signupHandler={this.signupHandler}/>} />
          <Route path='/login' render={() => <Login loginHandler={this.loginHandler}/>} />
          <Route path='/horoscopes' render={() => <HoroscopeContainer user={this.state.user} sign={this.state.sign}/>}/>
          <Route path='/favorites' render={() => <FavoriteHoroscopeContainer user={this.state.user} sign={this.state.sign}/>}/>
        </Switch>
      </div>
    )
  }
  
  
}

export default withRouter(App);

