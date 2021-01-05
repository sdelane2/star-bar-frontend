import logo from './logo.svg';
import './App.css';
import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import {Route, Switch, withRouter} from 'react-router-dom'
import Navbar from './Components/Navbar'
import HoroscopeContainer from './Containers/HoroscopeContainer'
import FavoriteHoroscopeContainer from './Containers/FavoriteHoroscopeContainer';
import AllHoroscopesContainer from './Containers/AllHoroscopesContainer'
import {connect} from 'react-redux'
import {loginUser, signUpUser, startUserSession} from './Redux/actions'


class App extends React.Component {

  componentDidMount(){
    this.props.setUser()
  }

  signupHandler = (userObj) => {
    this.props.signup(userObj)
    this.props.history.push('/horoscopes')
  }
  
  loginHandler = (userInfo)=>{
    this.props.login(userInfo, this.props.getSignInfo)
    this.props.history.push("/horoscopes")
  }

  render() {
    return (
      <div className="App">
        
        <Navbar />
        <Switch>
          <Route path='/signup' render={() => <Signup signupHandler={this.signupHandler}/>} />
          <Route path='/login' render={() => <Login loginHandler={this.loginHandler}/>} />
          <Route path='/all_horoscopes' component={AllHoroscopesContainer} />
          <Route path='/horoscopes' render={() => <HoroscopeContainer sign={this.props.user.sign}/>}/>
          <Route path='/favorites' component={FavoriteHoroscopeContainer}/>
        </Switch>
        </div>
    
      
    )
  }
  
  
}

const msp = state => {
  return {
    user: state.user
  }
}

const mdp = dispatch => {
  return {
    login: (userInfo, fn) => dispatch(loginUser(userInfo, fn)),
    signup: (userObj) => dispatch(signUpUser(userObj)),
    setUser: () => dispatch(startUserSession())
  }
}

export default connect(msp, mdp)(withRouter(App));

