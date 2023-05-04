const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE'

const initalState = {
    list:[],
    
}


// action for all the spots 
const load = list => ({
    type: LOAD,
    list
  });

  // action for adding spot 
const addOneSpot = spot => ({
  type:ADD_ONE,
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




// spots reducer 
const spotsReducer = (state = initalState, action) => {
    switch(action.type) {
        case LOAD: 
        console.log (action.list.Spots)
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
        default:
      return state;
    }
}

export default spotsReducer


