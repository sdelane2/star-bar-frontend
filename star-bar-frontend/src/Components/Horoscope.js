import React from 'react'

class Horoscope extends React.Component {

    deleteClickHandler = () => {
        this.props.deleteFavorite(this.props.id)
    }

    render() {
        return(
            <>
            <h1>{this.props.sign}</h1>
            <h4>{this.props.horoscope.current_date}</h4>
            <h3>{this.props.horoscope.description}</h3>
            <p>Lucky Color: {this.props.horoscope.color}</p>
            <p>Lucky Number: {this.props.horoscope.lucky_number}</p>
            <p>Compatibility: {this.props.horoscope.compatibility}</p>
            <p>Mood: {this.props.horoscope.mood}</p>
            <button onClick={this.props.yesterdayHoroscope}>Yesterday's horoscope</button>
            <button onClick={this.props.todayHoroscope}>Today's horoscope</button>
            <button onClick={this.props.tomorrowHoroscope}>Tomorrow's horoscope</button>
            {this.props.favoriteHoroscope ? <button onClick={this.props.favoriteHoroscope}>Save this horoscope to favorites</button> : <button onClick={this.deleteClickHandler}>Delete this horoscope from favorites</button> }
            </>
        )
    }
}

export default Horoscope