import React from 'react'
import Sign from '../Components/Sign'
import {
   Grid
  } from 'semantic-ui-react'

class AllHoroscopesContainer extends React.Component{

    state = {
        signs: []
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/signs', {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
          })
        .then(r => r.json())
        .then(data => this.setState({signs: data}))
    }

    renderSignPics = () => {
        return [...this.state.signs].map(sign => <><Sign key={sign.id} sign={sign}/><br/></>)
    }

    render(){
        return(
            <div class='ui three column doubling stackable grid container'>
                {this.renderSignPics()}
            </div>    
        )
    }
}

export default AllHoroscopesContainer