import logo from './logo.svg';
import './App.css';
import React from 'react'
import Form from './Components/Form'

class App extends React.Component{

  // componentDidMount(){
  //   fetch('http://localhost:3000/horoscopes')
  //   .then(r => r.json())
  //   .then(data => console.log(data))
  // }

  render(){
    return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;

