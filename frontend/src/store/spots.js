import { csrfFetch } from "./csrf"
const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'

const initalState = {
  list: [],

}



// action for all the spots 
const load = list => ({
  type: LOAD,
  list
});

// action for spot Detail
const addOneSpot = spot => ({
  type: ADD_ONE,
  spot

})

// action for create spot

const createSpot = spot => ({
  type: CREATE_SPOT,
  spot
})

// action for getting all the spots that belong to the user

const getUserSpots = list => ({
  type: GET_USER_SPOTS,
  list
})

//action for editing spot
const editSpot = spot => ({
  type: EDIT_SPOT,
  spot
})

//action for removing spot
const remove = (spotId) => ({
  type: REMOVE_SPOT,
  spotId
})

// thunk for getting all spots 
export const getAllSpots = () => async dispatch => {
  const response = await fetch('/api/spots');
  if (response.ok) {
    const list = await response.json()
    dispatch(load(list))
    // console.log(list, '-----------this is list---')
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

export const CreateSpot = (newSpot) => async dispatch => {
  console.log(newSpot, '-----------------this is spot------')
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSpot)
  })
  if (response.ok) {
    const spot = await response.json()
    dispatch(createSpot(spot))
    for (let i = 0; i < newSpot.images.length; i++) {
      let imageInfo = {}
      if (newSpot.images[i].length > 0) {
        imageInfo.url = newSpot.images[i]
        if (i === 0) {
          imageInfo.preview = true
          
        } else {
          imageInfo.preview = false
        }
        console.log (spot.id)
        const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(imageInfo)
        })
      }

    }
    return spot
  }
}

// Thunk for getting all spots that belongs to user

export const UserSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current')
  if (response.ok) {
    const userSpots = await response.json()
    dispatch(getUserSpots(userSpots))
  }
}

// Thunk for editing the spot
export const EditSpot = (spot, id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spot)
  })
  if (response.ok) {
    const editSpot = await response.json()
    dispatch(addOneSpot(editSpot))
    return editSpot
  }
}

// Thunk for removing spot
export const RemoveSpot = (spotId) => async dispatch => {
  console.log (spotId, '---------------this is spot id')
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    dispatch(remove(spotId))
  }
}




// spots reducer 
const spotsReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOAD:
      // console.log (action.list, '----------------list of spots-----')
      const allSpots = {};
      action.list.Spots.forEach(spot => {
        allSpots[spot.id] = spot;
      });
      return {
        ...allSpots,
        ...state,
        list: (action.list)
      }
    case ADD_ONE:{
      const singleSpotState = {}
    singleSpotState[action.spot.id] = action.spot
    // console.log (singleSpotState, '---------this is spot.avgRating------------')
    return singleSpotState
    }
      
    case CREATE_SPOT: {
      const newState = { ...state, [action.spot.id]: action.spot }
      return newState
    }
    case GET_USER_SPOTS:
      // console.log(action.list, '-------------------')
      const userSpots = { ...state }
      action.list.Spots.forEach(spot => {
        userSpots[spot.id] = spot
      });
      userSpots.list = action.list
      return userSpots

    case EDIT_SPOT:
      // console.log (action.spot)
      const newState = {}
      newState = { ...state }
      newState[action.spot.id] = action.pokemon
      return newState
    case REMOVE_SPOT:
      console.log(state)
      console.log(state.list.Spots)
      let newList = []
      state.list.Spots.forEach(spot => {
        if (spot.id !== action.spotId) {
          newList.push(spot)
        }
      })
      let deletState = { ...state }
      deletState.list = newList
      return deletState

    default:
      return state;
  }
}

export default spotsReducer


