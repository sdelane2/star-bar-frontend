import {
  TODAY,
  YESTERDAY,
  TOMORROW,
  LOGIN_USER,
  SIGNUP_USER,
  USER,
  ID,
  ALL_HOROSCOPES,
  FAVORITES,
  REMOVE_FAVORITE,
  FIND_ID,
  TODAY_SIGN,
  TOMORROW_SIGN,
  YESTERDAY_SIGN,
  ALL_SIGNS,
  SIGN
} from "./actionTypes";

/**** USER ACTIONS ****/

export function signUpUser(userObj){
    return function(dispatch){
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
        },
        body: JSON.stringify({user: userObj})
        })
        .then(r => r.json())
        .then(data => {
            dispatch({type: SIGNUP_USER, payload: data.user})
        })
    }
}

export function startUserSession(){
    const token = localStorage.getItem('token')
    return function(dispatch){
        fetch('http://localhost:3000/profile', {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(r => r.json())
      .then(data => {
          console.log(data)
        dispatch({type: USER, payload: data.user})
        })
    }
}

export function loginUser(userInfo, getSignInfo) {
  return function (dispatch) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    })
      .then((r) => r.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        dispatch({type: LOGIN_USER, payload: data.user})
    })
  }
}

/**** HOROSCOPE ACTIONS ****/

export function getAllHoroscopes(){
    const token = localStorage.getItem('token')
    return function(dispatch){
        fetch('http://localhost:3000/horoscopes', {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(r => r.json())
        .then(data => dispatch({type: ALL_HOROSCOPES, payload: data}))
    }
}

export function getTodayHoroscope(sign, fn, signFn) {
  return function (dispatch) {
    fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=today`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: TODAY, payload: data })
        fn()
        signFn(sign)
      });
  };
}

export function getYesterdayHoroscope(sign, fn, signFn){
    return function(dispatch){
        fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=yesterday`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
        .then(r => r.json())
        .then(json => {
            dispatch({type: YESTERDAY, payload: json})
            fn()
            signFn(sign)
        })
    }
}

export function getTomorrowHoroscope(sign, fn, signFn){
    return function(dispatch){
        fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=tomorrow`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
        .then(r => r.json())
        .then(json => {
            dispatch({type: TOMORROW, payload: json})
            fn()
            signFn(sign)
        })
    }
}

export function saveHoroscope(horoscope, signId){
    const token = localStorage.getItem('token')
    return function(dispatch){
        fetch('http://localhost:3000/horoscopes', {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Accepts: "application/json",
                      Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    current_date: horoscope.current_date,
                    description: horoscope.description,
                    lucky_number: parseInt(horoscope.lucky_number),
                    lucky_color: horoscope.color,
                    mood: horoscope.mood,
                    compatibility: horoscope.compatibility,
                    sign_id: signId
                  })
              }) 
              .then(r => r.json())
              .then(data => {
                  console.log(data, "success")
                  dispatch({type: ID, payload: data.id})
                }) 
    }
}

export function findId(id){
    return {type: FIND_ID, payload: id}
}

/**** FAVORITE HOROSCOPE ACTIONS ****/

export function getFavoriteHoroscopes(userId){
    const token = localStorage.getItem('token')
    return function(dispatch){
        fetch('http://localhost:3000/favorite_horoscopes', {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
          })
        .then(r => r.json())
        .then(data => dispatch({type: FAVORITES, payload: data.filter(d => d.user_id === userId)}))
    }
}

export function deleteFavoriteHoroscope(id){
    const token = localStorage.getItem('token')
    return function(dispatch){
        fetch(`http://localhost:3000/favorite_horoscopes/${id}`, {
            method: "DELETE",
            headers: {
                'content-type' : 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({type: REMOVE_FAVORITE, payload: id})
    }
}

/**** SIGN ACTIONS ****/

export function getAllSigns(){
    const token = localStorage.getItem('token')
    return function(dispatch){
        fetch('http://localhost:3000/signs', {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
            })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            dispatch({type: ALL_SIGNS, payload: data})
        })

    }
}

export function getSignToday(sign){
    return function(dispatch){
        fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=today`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            dispatch({type: TODAY_SIGN, payload: data})
        });
    }
}

export function getSignYesterday(sign){
    return function(dispatch){
        fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=yesterday`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            dispatch({type: YESTERDAY_SIGN, payload: data})
        });
    }
}

export function getSignTomorrow(sign){
    return function(dispatch){
        fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=tomorrow`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            dispatch({type: TOMORROW_SIGN, payload: data})
        });
    }
}

