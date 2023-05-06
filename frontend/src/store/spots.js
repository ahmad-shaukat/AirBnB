import { csrfFetch } from "./csrf"
const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
const EDIT_SPOT = 'spots/EDIT_SPOT'

const initalState = {
    list:[],
    
}



// action for all the spots 
const load = list => ({
    type: LOAD,
    list
  });

  // action for spot Detail
const addOneSpot = spot => ({
  type:ADD_ONE,
  spot

})

// action for create spot

const createSpot = spot => ({
  type:CREATE_SPOT,
  spot
})

// action for getting all the spots that belong to the user

const getUserSpots = list => ({
  type: GET_USER_SPOTS,
  list
})

//action for editing spot
const editSpot = spot => ({
  type:EDIT_SPOT,
  spot
})

// thunk for getting all spots 
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const list = await response.json()
        dispatch(load(list))
    }
}

// thunk for spot detail
export const getSingleSpot = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json()
    dispatch(addOneSpot(spot))
  }
}

// thunk for adding new spot 

export const CreateSpot = (spot) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  })
  if (response.ok) {
    const spot = await response.json()
    dispatch(createSpot(spot))
    return spot
  }
}

// Thunk for getting all spots that belongs to user

export const UserSpots = () => async dispatch => {
  const response = await fetch('/api/spots/current')
  if (response.ok) {
    const userSpots = await response.json()
    dispatch(getUserSpots(userSpots))
  }
}

// Thunk for editing the spot
export const EditSpot = (spot, id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method:'PUT',
    headers: {
      'Content-Type':'application/json',
    }, 
    body: JSON.stringify(spot)
  })
  if (response.ok) {
    const editSpot = await response.json()
    dispatch(addOneSpot(editSpot))
    return editSpot
  }
}




// spots reducer 
const spotsReducer = (state = initalState, action) => {
    switch(action.type) {
        case LOAD: 
        // console.log (action.list.Spots)
        const allSpots= {};
        action.list.Spots.forEach(spot => {
          allSpots[spot.id] = spot;
        });
        return {
          ...allSpots,
          ...state,
          list: (action.list)
        }
        case ADD_ONE:
          if (!state[action.spot.id]) {
            const newState = {
              ...state, 
              [action.spot.id]:action.spot
            }
            const spotList = newState.list.map(id =>newState[id]);
            spotList.push(action.spot)
            newState.list = spotList
            return newState
          }
          return {
            ...state, [action.spot.id]:{
              ...state[action.spot.id], ...action.spot
            }
          }
        case GET_USER_SPOTS:
          // console.log (action.list)
          const userSpots = {}
          action.list.Spots.forEach(spot => {
            userSpots[spot.id] = spot
          });
          return {
            ...userSpots,
            ...state,
            list:(action.list)
          }
        case EDIT_SPOT:
          console.log (action.spot)
          const newState = {}
          newState = {...state}
          newState[action.spot.id] = action.pokemon
          return newState
        default:
      return state;
    }
}

export default spotsReducer


