import React from 'react'
import {NavLink} from 'react-router-dom'

import {
    Button,
    Container,
    Menu,
    Visibility,
    Segment
  } from 'semantic-ui-react'

class Navbar extends React.Component{

    state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

    render(){

        const { children } = this.props
        const { fixed } = this.state

        return(

        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
        
          
              <Container>
                
                
                <Menu.Item as={NavLink} name='horoscopes' to='/horoscopes'>Horoscopes</Menu.Item>
                <Menu.Item as={NavLink} name='favorites' to='/favorites'>Favorite Horoscopes</Menu.Item>
                <Menu.Item as={NavLink} name='allHoroscopes' to='/all_horoscopes'>See other Horoscopes</Menu.Item>
                <Menu.Item position='right'>
                  <Button as={NavLink} to='/login'>
                    Log in
                  </Button>

                  <Button as={NavLink} to='/signup' style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            
            </Visibility>
        
        )
    }
}

export default Navbar