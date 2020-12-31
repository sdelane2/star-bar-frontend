import React from 'react'
import Horoscope from '../Components/Horoscope.js'

class FavoriteHoroscopeContainer extends React.Component   {

    state = {
        favoriteHoroscopes: []

    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/favorite_horoscopes', {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
          })
        .then(r => r.json())
        .then(data => this.setState({favoriteHoroscopes: data.filter(d => d.user_id === this.props.user.id)}))
    }

    deleteFavorite = (id) => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:3000/favorite_horoscopes/${id}`, {
            method: "DELETE",
            headers: {
                'content-type' : 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        this.setState({favoriteHoroscopes: [...this.state.favoriteHoroscopes].filter(d => d.id !== id)})
    }

    render() {
        let favorites = this.state.favoriteHoroscopes.map(favorite => <Horoscope horoscope={favorite.horoscope} id={favorite.id} deleteFavorite={this.deleteFavorite}/>)
        console.log(this.state.favoriteHoroscopes)
        return (
            <>
            {favorites}
            </>
            
    
        )
    }
}

export default FavoriteHoroscopeContainer