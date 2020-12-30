import React from 'react'
import {Redirect} from 'react-router-dom'

class HoroscopeContainer extends React.Component{
    state = {
        horoscope: {}
    }

    componentDidMount(){
        fetch(`https://aztro.sameerkumar.website?sign=${this.props.sign}&day=today`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
        .then(r => r.json())
        .then(json => this.setState({horoscope: json}, this.saveHoroscope))
    }
            
    saveHoroscope = () => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/horoscopes', {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Accepts: "application/json",
                      Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    date: this.state.horoscope.current_date,
                    description: this.state.horoscope.description,
                    lucky_number: parseInt(this.state.horoscope.lucky_number),
                    lucky_color: this.state.horoscope.color,
                    mood: this.state.horoscope.mood,
                    compatibility: this.state.horoscope.compatibility
                  })
              }) 
              .then(r => r.json())
              .then(console.log) 
    }

    render(){
        console.log(this.state.horoscope)
        return (
            <>
            {this.props.user ? 
            <>
                <h1>{this.props.sign}</h1>
                <h4>{this.state.horoscope.current_date}</h4>
                <h3>{this.state.horoscope.description}</h3>
                <p>Lucky Color: {this.state.horoscope.color}</p>
                <p>Lucky Number: {this.state.horoscope.lucky_number}</p>
                <p>Compatibility: {this.state.horoscope.compatibility}</p>
                <p>Mood: {this.state.horoscope.mood}</p>
            </>
            :
        
                <Redirect to='/login' />
            }
            </>
            )
    }

}

export default HoroscopeContainer