import React from 'react'
import {connect} from 'react-redux'
import { getSignToday } from '../Redux/actions';
import Horoscope from './Horoscope';

class Sign extends React.Component{

    state = {
        isClicked: false
    }

    clickHandler = (e) => {
        this.setState({isClicked: !this.state.isClicked})
        this.props.getSignTodayInfo(e.target.alt)
    }

    renderHoroscope = () => {
        return <Horoscope container={true} sign={this.props.sign.name} horoscope={this.props.signRedux}/>
    }

    render(){
        return(
            <>
                <img style={{maxWidth: "500px", height: "100px"}} key={this.props.sign.id} alt={this.props.sign.name} src={this.props.sign.image} onClick={this.clickHandler}/>
                {this.state.isClicked ?
                
                    this.renderHoroscope()
                
                :
                    null

                }
            </>
            )

    }
}

const msp = state => {
    return {
        signRedux: state.signHoroscope
    }
}

const mdp = dispatch => {
    return {
        getSignTodayInfo: (sign) => dispatch(getSignToday(sign))
    }
}

export default connect(msp, mdp)(Sign)