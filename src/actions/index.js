import {
    GET_REQUESTS,
    CREATE_REQUEST,
    CREATE_TRIP,
    GET_TRIPS,
    GET_EXPATS,
    CREATE_EXPAT,
    GET_TRAVELERS,
    CREATE_TRAVELER,
    GET_USER,
    GET_REAUTH,
    LOGOUT
    
} from './types'

// FETCH REQUESTS

export function fetchAllRequests(id) {
    return (dispatch) => {
        // dispatch({ type: GET_REQUESTS });
        fetch(`http://localhost:3000/api/v1/expats/${id}/requests`)
        .then(resp => resp.json())
        .then(data => {
            dispatch({ type: GET_REQUESTS, payload: data})
        });
    }
}

// CREATE REQUEST

export function createRequest(newRequest, id) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/expats/${id}/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newRequest),
            })
            .then(resp => resp.json())
            .then(request => {
                dispatch({ type: CREATE_REQUEST, payload: request})
                // this.props.createDeal(request)
                // this.props.history.push('/requests')
            })
    }
}

// FETCH TRIPS

export function fetchAllTrips(id) {
    console.log('get id', id)
    return (dispatch) => {
        // dispatch({ type: GET_TRIPS });
        fetch(`http://localhost:3000/api/v1/travelers/${id}/trips`)
        .then(resp => resp.json())
        .then(data => {
            console.log('data',data)
            dispatch({ type: GET_TRIPS, payload: data})
        });
    }
}

// CREATE TRIPS

export function createTrip(newTrip, id) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/travelers/${id}/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newTrip),
            })
            .then(resp => resp.json())
            .then(trip => {
                dispatch({ type: CREATE_TRIP, payload: trip})
                // this.props.createTrip(trip)
                // this.props.history.push('/trips')
            })
    }
}

// FETCH EXPATS

export function fetchAllExpats() {
    return (dispatch) => {
        // dispatch({ type: GET_EXPATS });
        fetch('http://localhost:3000/api/v1/expats')
        .then(resp => resp.json())
        .then(data => {
            dispatch({ type: GET_EXPATS, payload: data})
        });
    }
}

// CREATE EXPAT

export function createExpat(newExpat) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/expats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newExpat),
            })
            .then(resp => resp.json())
            .then(expat => {
                dispatch({ type: CREATE_EXPAT, payload: expat})
            })
    }
}


// FETCH TRAVELERS

export function fetchAllTravelers() {
    return (dispatch) => {
        // dispatch({ type: GET_TRAVELERS });
        fetch('http://localhost:3000/api/v1/travelers')
        .then(resp => resp.json())
        .then(data => {
            dispatch({ type: GET_TRAVELERS, payload: data})
        });
    }
}

// CREATE TRAVELER

export function createTraveler(newTraveler) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/travelers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newTraveler),
            })
            .then(resp => resp.json())
            .then(traveler => {
                dispatch({ type: CREATE_TRAVELER, payload: traveler})
            })
    }
}

// GET LOGIN

export function getLogin(user) {
    return {
        type: GET_USER,
        payload: user
    }
}

// GET CURRENT USER

export function getReauth() {
    const token = localStorage.getItem('jwt')

    if (token) {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            }
        }
        return (dispatch) => {
            fetch('http://localhost:3000/api/v1/reauth', options)
                .then(resp => resp.json())
                .then(user => {
                    console.log(user)
                    dispatch(getLogin(user))
                })
        }
    } else {
        return (dispatch) => {}
    }
}

// LOGOUT

export function logout() {
    return {
        type: LOGOUT
    }
}