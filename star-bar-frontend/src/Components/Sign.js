import React from 'react'
import {connect} from 'react-redux'
import { getSignToday } from '../Redux/actions';
import Horoscope from './Horoscope';
import {
    Modal,
    Button
   } from 'semantic-ui-react'

class Sign extends React.Component{

    state = {
        horoscope: {},
        isClicked: false,
        isOpen: false
    }

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
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
                <div className="column">
                <img style={{maxWidth: "500px", height: "100px"}} key={this.props.sign.id} alt={this.props.sign.name} src={this.props.sign.image} onClick={this.clickHandler}/>
                {/* <button onClick={this.toggleModal}>modal</button> */}
                <Modal onOpen={this.toggleModal} trigger={<Button>modal</Button>}
                onClose={this.toggleModal}>
                {this.renderHoroscope()}
                {/* testing */}
                </Modal>
                </div>
                {/* {this.state.isClicked ?
                
                
                :
                    null

                } */}
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