import React from 'react'
import '../styles/HoroscopeContainer.css'
import {Redirect} from 'react-router-dom'
import Horoscope from '../Components/Horoscope.js'
import {connect} from 'react-redux'
import { findId, getAllHoroscopes, getAllSigns, saveHoroscope} from '../Redux/actions'
import { Transition, Grid } from 'semantic-ui-react'

class HoroscopeContainer extends React.Component{

    state = {
        yesterday: [],
        today: [],
        tomorrow: []
    }

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
            <Transition duration={500}>

            <div className="horoscope-box">
                <div className="inputBox">
                <Horoscope sign={this.props.sign} container={true} horoscope={this.props.horoscope} />
                </div>
                </div>
                </Transition>
            
            
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