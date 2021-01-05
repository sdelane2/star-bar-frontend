import React from 'react'
import Sign from '../Components/Sign'
import {connect} from 'react-redux'

class AllHoroscopesContainer extends React.Component{


    renderSignPics = () => {
        return [...this.props.signs].map(sign => <><Sign key={sign.id} sign={sign}/><br/></>)
    }

    render(){
        console.log(this.props.signs)
        return(
            <>
            {this.renderSignPics()}
            </>    
        )
    }
}

const msp = state => {
    return {
        signs: state.signsFromDatabase
    }
}


export default connect(msp)(AllHoroscopesContainer)