import React from 'react'
import {connect} from 'react-redux'
import { Button, Icon, Segment } from 'semantic-ui-react'
import { findId, getAllHoroscopes, getTodayHoroscope, getTomorrowHoroscope, getYesterdayHoroscope, saveHoroscope, getFavoriteHoroscopes, getSignToday, getSignYesterday, getSignTomorrow, getAllSigns, deleteFavoriteHoroscope} from '../Containers/Redux/actions'

class Horoscope extends React.Component {


    componentDidMount(){
        if (this.props.user){
            this.props.getSigns()
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

    deleteClickHandler = (e) => {
        debugger
        const id = [...this.props.favoriteHoroscopes].find(h => h.horoscope.id === parseInt(e.target.id)).id
        this.props.deleteFavorite(id)
    }

    render() {
        return(
            <Segment padded>
            <div style={{color: 'white', textAlign: 'center'}}>
            <h1>{this.props.sign}</h1>
            <h4>{this.props.horoscope.current_date}</h4>
            <h3>{this.props.horoscope.description}</h3>
            <p>Lucky Color: {this.props.horoscope.color}</p>
            <p>Lucky Number: {this.props.horoscope.lucky_number}</p>
            <p>Compatibility: {this.props.horoscope.compatibility}</p>
            <p>Mood: {this.props.horoscope.mood}</p>
            <br/>
            </div>
            {this.props.container ?
                <div style={{textAlign: 'center'}}>
                    <Button onClick={this.yesterdayClickHandler}>Yesterday's horoscope</Button>
                    <Button onClick={this.todayClickHandler}>Today's horoscope</Button>
                    <Button onClick={this.tomorrowClickHandler}>Tomorrow's horoscope</Button>
                <br/><br/>
                </div>
            :
                null
            }

            {/* {this.props.container ?  */}
                {[...this.props.favoriteHoroscopes].find(h => h.horoscope.id === this.props.horoscopeId) || [...this.props.favoriteHoroscopes].find(h => h.horoscope.id === this.props.horoscope.id) ?
                    <div style={{textAlign: 'center'}}>
                        <Icon id={this.props.horoscope.id}onClick={this.deleteClickHandler} size='big' name='heart' color='red'></Icon>                 
                    </div>
                        :
                    <div style={{textAlign: 'center'}}>
                        <Icon id={this.props.horoscope.id} size='big' name='heart outline' onClick={this.favoriteHoroscope}color='red'></Icon>
                        {/* <Button color='red' onClick={this.favoriteHoroscope} >Save this horoscope to favorites</Button>  */}
                    </div>
                }
            {/* : 
            <Icon onClick={this.deleteClickHandler} size='big' name='heart' color='red'></Icon>

            // <Button onClick={this.deleteClickHandler}>Delete this horoscope from favorites</Button> 
            } */}

            </Segment>
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
        getSigns: () => dispatch(getAllSigns()),
        deleteFavorite: (id) => dispatch(deleteFavoriteHoroscope(id))
    }
}
export default connect(msp, mdp)(Horoscope)