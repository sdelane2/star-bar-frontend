import React from 'react'
import Sign from '../Components/Sign'
import {connect} from 'react-redux'
import {
   Grid, Segment
  } from 'semantic-ui-react'

class AllHoroscopesContainer extends React.Component{


    renderSignPics = () => {
        return [...this.props.signs].map(sign => <><Sign container={true} key={sign.id} sign={sign}/><br/></>)
    }

    render(){
        return(
            <>
            <br></br>
            <br></br>
            <div className='ui three column doubling stackable grid container'>
                {this.renderSignPics()}
            </div> 
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