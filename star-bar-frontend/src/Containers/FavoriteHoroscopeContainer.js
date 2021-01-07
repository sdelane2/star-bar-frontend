import React from 'react'
import Horoscope from '../Components/Horoscope.js'
import {connect} from 'react-redux'
import { deleteFavoriteHoroscope, getFavoriteHoroscopes } from '../Redux/actions.js'
import { Grid, Segment } from 'semantic-ui-react'


class FavoriteHoroscopeContainer extends React.Component   {


    componentDidMount(){
        this.props.getFavorites(this.props.user.id)
    }

    deleteFavorite = (id) => {
        this.props.deleteFavorite(id)
    }


    render() {
        let favorites = this.props.favoriteHoroscopes.map(favorite => <> <Grid.Row><Segment><Horoscope sign={favorite.sign} container={false} key={favorite.id} horoscope={favorite.horoscope} id={favorite.id} deleteFavorite={this.deleteFavorite}/></Segment></Grid.Row></>)
        return (
            <>
        
            <Grid verticalAlign='middle' rows={this.props.favoriteHoroscopes.length} centered>
            <Grid.Column>
            
                {favorites}
        
            </Grid.Column>
            </Grid>
            </>
            
    
        )
    }
}

const msp = state => {
    return {
        favoriteHoroscopes: state.favoriteHoroscopes,
        user: state.user,
        signs: state.signsFromDatabase
    }
}

const mdp = dispatch => {
    return {
        getFavorites: (userId) => dispatch(getFavoriteHoroscopes(userId)),
        deleteFavorite: (id) => dispatch(deleteFavoriteHoroscope(id))
    }
}

export default connect(msp, mdp)(FavoriteHoroscopeContainer)