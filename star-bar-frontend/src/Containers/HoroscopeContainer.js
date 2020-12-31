import React from 'react'
import {Redirect} from 'react-router-dom'
import Horoscope from '../Components/Horoscope.js'

class HoroscopeContainer extends React.Component{
    state = {
        horoscope: {},
        horoscope_id: ""
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
              .then(data => this.setState({horoscope_id: data})) 
    }

    favoriteHoroscope = () => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:3000/favorite_horoscopes`, {
            method: "POST",
            headers: {
                "content-type" : "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({user_id: this.props.user.id, horoscope_id: this.state.horoscope_id.id})
        })
        .then(r => r.json())
        .then(console.log)
    }

    todayHoroscope = () => {
        fetch(`https://aztro.sameerkumar.website?sign=${this.props.sign}&day=today`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
        .then(r => r.json())
        .then(json => this.setState({horoscope: json}, this.saveHoroscope))
    }
    yesterdayHoroscope = () => {
        fetch(`https://aztro.sameerkumar.website?sign=${this.props.sign}&day=yesterday`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
        .then(r => r.json())
        .then(json => this.setState({horoscope: json}, this.saveHoroscope))
    }
    
    tomorrowHoroscope = () => {
        fetch(`https://aztro.sameerkumar.website?sign=${this.props.sign}&day=tomorrow`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
        .then(r => r.json())
        .then(json => this.setState({horoscope: json}, this.saveHoroscope))
    }

    render(){
        console.log(this.props.user)
        
        return (
            <>
            {this.props.user ? 
            <>
                < Horoscope horoscope={this.state.horoscope} tomorrowHoroscope={this.tomorrowHoroscope} yesterdayHoroscope={this.yesterdayHoroscope} todayHoroscope={this.todayHoroscope} favoriteHoroscope={this.favoriteHoroscope}/>
            </>
            :
        
                <Redirect to='/login' />
            }
            </>
            )
    }

}

export default HoroscopeContainer