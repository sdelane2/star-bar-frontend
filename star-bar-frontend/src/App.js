import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Form from './Components/Form'

function App() {

  const [user, setUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        console.log(data)
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }
  
  
    return (
      <div className="App">
        <Form handleLogin={handleLogin}/>
      </div>
    );
  
}

export default App;

