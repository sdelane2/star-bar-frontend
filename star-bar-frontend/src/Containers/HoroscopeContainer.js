import React from 'react'
import {Redirect} from 'react-router-dom'

class HoroscopeContainer extends React.Component{
    state = {
        horoscopes: []
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        if (this.props.user){
            fetch('http://localhost:3000/horoscopes', {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(r => r.json())
            .then(console.log)
        }
    }

    render(){
        return (
            <>
            {this.props.user ? 
                <h1>Hi</h1>
            :
        
                <Redirect to='/login' />
            }
            </>
            )
    }

}

export default HoroscopeContainer