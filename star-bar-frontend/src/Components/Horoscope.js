import React from 'react'
import {connect} from 'react-redux'
import { findId, getAllHoroscopes, getTodayHoroscope, getTomorrowHoroscope, getYesterdayHoroscope, saveHoroscope, getFavoriteHoroscopes} from '../Redux/actions'

class Horoscope extends React.Component {

    componentDidMount(){
        if (this.props.user){
            this.props.todayHoroscope(this.props.user.sign, this.saveHoroscope)
        }
    }

    saveHoroscope = () => {
        const id = [...this.props.horoscopes].find(h => h.current_date === this.props.apiHoroscope.current_date && h.description === this.props.apiHoroscope.description)
        if (id){
            console.log("horoscope already in db; not saved", id.id)
            return this.props.findIdFromDatabase(id.id)
        } else {
            console.log("horoscope saved in db")
            return this.props.saveHoroscopeToDatabase(this.props.apiHoroscope)
        }
    }

    yesterdayClickHandler = () => {
        this.props.yesterdayHoroscope(this.props.user.sign, this.saveHoroscope)
    }
  
    todayClickHandler = () => {
        this.props.todayHoroscope(this.props.user.sign, this.saveHoroscope)
        this.saveHoroscope()
    }

    tomorrowClickHandler = () => {
        this.props.tomorrowHoroscope(this.props.user.sign, this.saveHoroscope)
        this.saveHoroscope()
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
            body: JSON.stringify({user_id: this.props.user.id, horoscope_id: this.props.horoscopeId})
        })
        .then(r => r.json())
        .then(data => this.props.getFavorites(this.props.user.id))
    }

    deleteClickHandler = () => {
        this.props.deleteFavorite(this.props.id)
    }

    render() {
        // console.log(this.props.favoriteHoroscopes)
        // debugger
        return(
            <>
            <h1>{this.props.sign}</h1>
            <h4>{this.props.horoscope.current_date}</h4>
            <h3>{this.props.horoscope.description}</h3>
            <p>Lucky Color: {this.props.horoscope.color}</p>
            <p>Lucky Number: {this.props.horoscope.lucky_number}</p>
            <p>Compatibility: {this.props.horoscope.compatibility}</p>
            <p>Mood: {this.props.horoscope.mood}</p>

            {this.props.container ?
                <>
                    <button onClick={this.yesterdayClickHandler}>Yesterday's horoscope</button>
                    <button onClick={this.todayClickHandler}>Today's horoscope</button>
                    <button onClick={this.tomorrowClickHandler}>Tomorrow's horoscope</button>
                </>
            :
                null
            }

            {this.props.container ? 
                [...this.props.favoriteHoroscopes].find(h => h.horoscope.id === this.props.horoscopeId) ?
                    
                    null                  
                        :
                    <button onClick={this.favoriteHoroscope} >Save this horoscope to favorites</button> 
            : 
            <button onClick={this.deleteClickHandler}>Delete this horoscope from favorites</button> 
            }

            </>
        )
    }
}

const msp = state => {
    return {
        apiHoroscope: state.apiHoroscope,
        user: state.user,
        horoscopeId: state.horoscopeId,
        horoscopes: state.horoscopes,
        favoriteHoroscopes: state.favoriteHoroscopes
    }
}

const mdp = dispatch => {
    return {
        todayHoroscope: (sign, fn) => dispatch(getTodayHoroscope(sign, fn)),
        yesterdayHoroscope: (sign, fn) => dispatch(getYesterdayHoroscope(sign, fn)),
        tomorrowHoroscope: (sign, fn) => dispatch(getTomorrowHoroscope(sign, fn)),
        saveHoroscopeToDatabase: (horoscope) => dispatch(saveHoroscope(horoscope)),
        findIdFromDatabase: (id) => dispatch(findId(id)),
        allHoroscopes: () => dispatch(getAllHoroscopes()),
        getFavorites: (id) => dispatch(getFavoriteHoroscopes(id))
    }
}
export default connect(msp, mdp)(Horoscope)