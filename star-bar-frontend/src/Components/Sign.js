import React from 'react'
import {connect} from 'react-redux'
import { getSign } from '../Redux/actions';
import Horoscope from './Horoscope';

class Sign extends React.Component{

    state = {
        horoscope: {},
        isClicked: false
    }

    clickHandler = (e) => {
        // fetch(`https://aztro.sameerkumar.website?sign=${this.props.sign.name}&day=today`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({}),
        // })
        // .then((r) => r.json())
        // .then((data) => this.setState({horoscope: data, isClicked: !this.state.isClicked}));
        this.setState({isClicked: !this.state.isClicked})
        this.props.getSignInfo(e.target.alt)
    }

    renderHoroscope = () => {
        return <Horoscope sign={this.props.sign.name} horoscope={this.props.signRedux}/>
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
        signRedux: state.sign
    }
}

const mdp = dispatch => {
    return {
        getSignInfo: (sign) => dispatch(getSign(sign))
    }
}

export default connect(msp, mdp)(Sign)