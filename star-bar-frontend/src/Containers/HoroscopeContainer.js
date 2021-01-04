import React from 'react'
import {Redirect} from 'react-router-dom'
import Horoscope from '../Components/Horoscope.js'
import {connect} from 'react-redux'
import { findId, getAllHoroscopes, saveHoroscope} from '../Redux/actions'

class HoroscopeContainer extends React.Component{

    componentDidMount(){
        if (this.props.user){
            this.props.allHoroscopes()
        }
    }

    render(){
        // console.log(this.props)
        return (
            <>
            {this.props.user ? 
            <>
                <h1>{this.props.user.sign}</h1>
                <Horoscope container={true} horoscope={this.props.horoscope} />
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
        favoriteHoroscopes: state.favoriteHoroscopes
    }
}

const mdp = dispatch => {
    return {
        saveHoroscopeToDatabase: (horoscope) => dispatch(saveHoroscope(horoscope)),
        findIdFromDatabase: (id) => dispatch(findId(id)),
        allHoroscopes: () => dispatch(getAllHoroscopes())
    }
}

export default connect(msp, mdp)(HoroscopeContainer)