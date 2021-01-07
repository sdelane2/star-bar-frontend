import React from 'react'
import {connect} from 'react-redux'
import { getSignToday } from '../Redux/actions';
import Horoscope from './Horoscope';
import {Modal, Icon, Segment, ModalDescription} from 'semantic-ui-react'

class Sign extends React.Component{

    state = {
        horoscope: {},
        isOpen: false
    }

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    clickHandler = (e) => {
        this.props.getSignTodayInfo(e.target.previousElementSibling.alt)
    }

    renderHoroscope = () => {
        return <Horoscope container={this.props.container} sign={this.props.sign.name} horoscope={this.props.signRedux}/>
    }

    render(){
        console.log(this.props.container)
        return(
            <>
                <div className="column">
                <Modal basic onOpen={this.toggleModal} onClose={this.toggleModal} trigger={<img style={{maxWidth: "500px", height: "100px"}} key={this.props.sign.id} alt={this.props.sign.name} src={this.props.sign.image} />}>
                
                <Modal.Content>

                {this.renderHoroscope()}

                </Modal.Content>


                

                </Modal>
                </div>
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