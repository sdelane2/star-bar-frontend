import {combineReducers} from 'redux'
import {TODAY, YESTERDAY, TOMORROW, LOGIN_USER, USER, SIGNUP_USER, ID, FAVORITES, ALL_HOROSCOPES, REMOVE_FAVORITE, FIND_ID, TODAY_SIGN, YESTERDAY_SIGN, TOMORROW_SIGN, ALL_SIGNS} from './actionTypes'

const defaultState = {
    horoscopes: [],
    apiHoroscope: {},
    favoriteHoroscopes: [],
    user: null,
    horoscopeId: null,
    signHoroscope: {},
    signsFromDatabase: []
}

function horoscopesReducer(prevState = defaultState.horoscopes, action){
    switch(action.type){
        case ALL_HOROSCOPES:
            return action.payload
        default:
            return prevState
    }
}

function horoscopeReducer(prevState = defaultState.apiHoroscope, action){
    switch (action.type){
        case TODAY:
            return action.payload 
        case YESTERDAY:
            return action.payload
        case TOMORROW:
            return action.payload
        default:
            return prevState
    }
}

function favoriteHoroscopesReducer(prevState = defaultState.favoriteHoroscopes, action){
    switch(action.type){
        case FAVORITES:
            return action.payload
        case REMOVE_FAVORITE:
            const newFaves = [...prevState].filter(d => d.id !== action.payload)
            return newFaves
        default:
            return prevState
    }
}

function userReducer(prevState = defaultState.user, action){
    switch(action.type){
        case LOGIN_USER:
            // console.log("user reducer", action.payload)
            return action.payload
        case USER:
            return action.payload
        case SIGNUP_USER:
            return action.payload
        default:
            return prevState
    }
}

function horoscopeIdReducer(prevState = defaultState.horoscopeId, action){
    switch(action.type){
        case ID:
            console.log(action.payload)
            return action.payload
        case FIND_ID:
            return action.payload
        default:
            return prevState
    }
}

function signHoroscopeReducer(prevState = defaultState.signHoroscope, action){
    switch(action.type){
        case TODAY_SIGN:
            // console.log("sign", action.payload)
            return action.payload
        case YESTERDAY_SIGN:
            return action.payload 
        case TOMORROW_SIGN:
            return action.payload
        default: 
            return prevState
    }

}

function signsReducer(prevState = defaultState.signsFromDatabase, action){
    switch(action.type){
        case ALL_SIGNS:
            return action.payload
        default:
            return prevState
    }
}




const rootReducer = combineReducers({
    horoscopes: horoscopesReducer,
    apiHoroscope: horoscopeReducer,
    favoriteHoroscopes: favoriteHoroscopesReducer,
    user: userReducer,
    horoscopeId: horoscopeIdReducer,
    signHoroscope: signHoroscopeReducer,
    signsFromDatabase: signsReducer
})
export default rootReducer