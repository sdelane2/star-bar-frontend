import React from 'react'
import {Redirect} from 'react-router-dom'
import Horoscope from '../Components/Horoscope.js'
import {connect} from 'react-redux'
import { findId, getAllHoroscopes, getTodayHoroscope, getTomorrowHoroscope, getYesterdayHoroscope, saveHoroscope} from '../Redux/actions'

class HoroscopeContainer extends React.Component{
    state = {
        horoscope_id: ""
    }

    componentDidMount(){
        if (this.props.user){
            this.props.allHoroscopes()
            this.todayHoroscope()
            this.saveHoroscope()
        }
    }
            
    saveHoroscope = () => { 
        if (!this.props.horoscopes.find(horoscope => horoscope.date === this.props.horoscope.current_date && horoscope.description === this.props.horoscope.description)){
            this.props.saveHoroscopeToDatabase(this.props.horoscope)
            console.log("horoscope saved in db")
        } else {
            const id = this.props.horoscopes.find(horoscope => horoscope.date === this.props.horoscope.current_date && horoscope.description === this.props.horoscope.description).id 
            console.log(id, "from save horoscope")
            this.props.findIdFromDatabase(id)
            console.log("horoscope already in db; not saved")
        }
    }

    favoriteHoroscope = () => {
        if (!this.props.favoriteHoroscopes.find(horoscope => horoscope.current_date === this.props.horoscope.current_date && horoscope.description === this.props.horoscope.description)){
            const token = localStorage.getItem('token')
            fetch(`http://localhost:3000/favorite_horoscopes`, {
                method: "POST",
                headers: {
                    "content-type" : "application/json",
                    Accepts: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({user_id: this.props.user.id, horoscope_id: this.props.horoscopeId})
            })
            .then(r => r.json())
            .then(console.log)
        }
    }

    todayHoroscope = () => {
        this.props.todayHoroscope(this.props.user.sign)
        console.log(this.props.horoscopes)
        if (this.props.horoscopes && !this.props.horoscopes.find(h => h.current_date === this.props.horoscope.current_date && h.description === this.props.horoscope.description)){
            this.saveHoroscope()
        }
    }
    yesterdayHoroscope = () => {
        this.props.yesterdayHoroscope(this.props.user.sign)
        this.saveHoroscope()
    }
    
    tomorrowHoroscope = () => {
        this.props.tomorrowHoroscope(this.props.user.sign)
        this.saveHoroscope()
    }

    render(){
        console.log(this.props.horoscopes)
        return (
            <>
            {this.props.user ? 
            <>
                < Horoscope horoscope={this.props.horoscope} tomorrowHoroscope={this.tomorrowHoroscope} yesterdayHoroscope={this.yesterdayHoroscope} todayHoroscope={this.todayHoroscope} favoriteHoroscope={this.favoriteHoroscope}/>
            </>
            :
        
                <Redirect to='/login' />
            }
            </>
            )
    }

}

const msp = state => {
    return {
        horoscope: state.horoscope,
        user: state.user,
        horoscopeId: state.horoscopeId,
        horoscopes: state.horoscopes,
        favoriteHoroscopes: state.favoriteHoroscopes
    }
}

const mdp = dispatch => {
    return {
        todayHoroscope: (sign) => dispatch(getTodayHoroscope(sign)),
        yesterdayHoroscope: (sign) => dispatch(getYesterdayHoroscope(sign)),
        tomorrowHoroscope: (sign) => dispatch(getTomorrowHoroscope(sign)),
        saveHoroscopeToDatabase: (horoscope) => dispatch(saveHoroscope(horoscope)),
        findIdFromDatabase: (id) => dispatch(findId(id)),
        allHoroscopes: () => dispatch(getAllHoroscopes())
    }
}

export default connect(msp, mdp)(HoroscopeContainer)