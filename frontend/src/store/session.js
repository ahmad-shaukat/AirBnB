import {csrfFetch} from './csrf'


const initalState = {
    user:null
}
const SET_USER  = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser =  user => {
    return {
        type:SET_USER,
    user 
    }
   
}
const removeUser =  () => {
    return {
        type:REMOVE_USER
    }
   
}


export const login = (user) => async dispatch => {
    console.log (user)
    const {credential, password} = user;
    const response = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify({
            credential, password
        }),
    
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(setUser(data.user))
        return response
    }
}
export const logout = () => async dispatch => {
    const response = await csrfFetch(`/api/session`, {
        method:'DELETE'
    })
    dispatch(removeUser());
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };



export const signup = (user) => async (dispatch) => {
    console.log (user)
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };



const sessionReducer = (state = initalState, action) => {
    let newState = {}
    switch(action.type) {
        case SET_USER:
            newState = {...state}
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;

    }
}

export default sessionReducer