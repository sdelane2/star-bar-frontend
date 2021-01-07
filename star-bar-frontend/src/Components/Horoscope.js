import React from 'react'
import {connect} from 'react-redux'
import { findId, getAllHoroscopes, getTodayHoroscope, getTomorrowHoroscope, getYesterdayHoroscope, saveHoroscope, getFavoriteHoroscopes, getSignToday, getSignYesterday, getSignTomorrow, getAllSigns} from '../Redux/actions'
import { Button, Icon, Card, Segment } from 'semantic-ui-react'
class Horoscope extends React.Component {


    componentDidMount(){
        if (this.props.user){
            this.props.getSigns()
            this.props.getFavorites(this.props.user.id)
            this.props.todayHoroscope(this.props.sign, this.saveHoroscope, this.props.getSignTodayInfo)
        }
    }

    saveHoroscope = () => {
        const id = [...this.props.horoscopes].find(h => h.current_date === this.props.apiHoroscope.current_date && h.description === this.props.apiHoroscope.description)
            if (id){
                console.log("horoscope already in db; not saved", id.id)
                return this.props.findIdFromDatabase(id.id)
            } else {
                const signIdForDatabase = [...this.props.signs].find(sign => sign.name === this.props.sign).id
    
                console.log("horoscope saved in db")
                return this.props.saveHoroscopeToDatabase(this.props.apiHoroscope, signIdForDatabase)
            }
    }

    yesterdayClickHandler = () => {
        this.props.yesterdayHoroscope(this.props.sign, this.saveHoroscope, this.props.getSignYesterdayInfo)
    }
  
    todayClickHandler = () => {
        this.props.todayHoroscope(this.props.sign, this.saveHoroscope, this.props.getSignTodayInfo)
    }

    tomorrowClickHandler = () => {
        this.props.tomorrowHoroscope(this.props.sign, this.saveHoroscope, this.props.getSignTomorrowInfo)
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
        // debugger
        console.log(this.props.container)
        return(
            <>
            {this.props.container ? 
                [...this.props.favoriteHoroscopes].find(h => h.horoscope.id === this.props.horoscopeId) ?
                    
                    null                  
                        :
                    <Icon name={"favorite"} className={"favorite"} corner={"top right"} size={"large"} onClick={this.favoriteHoroscope} ></Icon> 
            : 
            
            <Icon inverted aria-hidden={"false"} name={"trash alternate outline"} className={"favorite"} corner={"top right"} size={"large"} onClick={this.deleteClickHandler} ></Icon>
            
            }
           
            <br></br>
            <br></br>
            <br></br>
        

            <div style={{color: "white"}}>
            <div style={{color: "white", textAlign: 'center'}}>
            <h1>{this.props.sign}</h1>
            <h4>{this.props.horoscope.current_date}</h4>
            <h3>{this.props.horoscope.description}</h3>
            <p>Lucky Color: {this.props.horoscope.color}</p>
            <p>Lucky Number: {this.props.horoscope.lucky_number}</p>
            <p>Compatibility: {this.props.horoscope.compatibility}</p>
            <p>Mood: {this.props.horoscope.mood}</p>
            </div>
            <br></br>
            </div>
            {this.props.container ?
                <>
                    <Icon name={"caret left"} size={"big"} onClick={this.yesterdayClickHandler}></Icon>
                    <Icon name={"genderless"} size={"big"} onClick={this.todayClickHandler}></Icon>
                    <Icon name={"caret right"} size={"big"} onClick={this.tomorrowClickHandler}></Icon><br></br>
                </>
            :
                null
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
        favoriteHoroscopes: state.favoriteHoroscopes,
        signRedux: state.signHoroscope,
        signs: state.signsFromDatabase
    }
}

const mdp = dispatch => {
    return {
        todayHoroscope: (sign, fn, signFn) => dispatch(getTodayHoroscope(sign, fn, signFn)),
        yesterdayHoroscope: (sign, fn, signFn) => dispatch(getYesterdayHoroscope(sign, fn, signFn)),
        tomorrowHoroscope: (sign, fn, signFn) => dispatch(getTomorrowHoroscope(sign, fn, signFn)),
        saveHoroscopeToDatabase: (horoscope, signId) => dispatch(saveHoroscope(horoscope, signId)),
        findIdFromDatabase: (id) => dispatch(findId(id)),
        allHoroscopes: () => dispatch(getAllHoroscopes()),
        getFavorites: (id) => dispatch(getFavoriteHoroscopes(id)),
        getSignTodayInfo: (sign) => dispatch(getSignToday(sign)),
        getSignYesterdayInfo: (sign) => dispatch(getSignYesterday(sign)),
        getSignTomorrowInfo: (sign) => dispatch(getSignTomorrow(sign)),
        getSigns: () => dispatch(getAllSigns())
    }
}
export default connect(msp, mdp)(Horoscope)