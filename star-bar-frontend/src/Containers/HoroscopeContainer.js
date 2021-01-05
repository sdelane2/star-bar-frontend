import React from 'react'
import '../styles/HoroscopeContainer.css'
import {Redirect} from 'react-router-dom'
import Horoscope from '../Components/Horoscope.js'
import {connect} from 'react-redux'
import { findId, getAllHoroscopes, getAllSigns, saveHoroscope} from '../Redux/actions'

class HoroscopeContainer extends React.Component{

    componentDidMount(){
        if (this.props.user){
            this.props.getSigns()
            this.props.allHoroscopes()
        }
    }

    render(){
        return (
            <>
            {this.props.user ? 
            <>
            <i className="arrow left"></i>
            <div className="horoscope-box">
                <div className="inputBox">
                <Horoscope sign={this.props.sign} container={true} horoscope={this.props.horoscope} />
                </div>
            </div>
            
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
        horoscope: state.apiHoroscope,
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
        saveHoroscopeToDatabase: (horoscope) => dispatch(saveHoroscope(horoscope)),
        findIdFromDatabase: (id) => dispatch(findId(id)),
        allHoroscopes: () => dispatch(getAllHoroscopes()),
        getSigns: () => dispatch(getAllSigns())
    }
}

export default connect(msp, mdp)(HoroscopeContainer)