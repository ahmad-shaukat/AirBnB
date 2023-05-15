import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const load = (reviews, spotId) => ({
    type:LOAD_REVIEWS,
    reviews,
    spotId,

})

const createReview = (review) => ({
    type:CREATE_REVIEW,
    review
})

const deleteReview = (reviewId) => ({
    type:DELETE_REVIEW,
    reviewId
})


// thunks for loading reviews

export const SpotReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(load(reviews, spotId))
    }
}

//thunk for adding review

export const CreateReview = (review, spotId) => async dispatch => {
    // console.log (review, spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)  
    })
    if (response.ok) {
        const newReview = response.json()
        dispatch(createReview(newReview))
        return review
    }
}

// thunk for removing reviews

export const DeleteReview = (reviewId) => async disaptch => {
    // console.log ('in the delete------------------------')
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    })
    if (response.ok) {
        disaptch(deleteReview(reviewId))
    }
}

const initalState = {
    list:[]
}
const reviewsReducer = (state = initalState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:  {
            // console.log (action.reviews.Reviews, 'reviews from action')
            const allReviews = {}
            action.reviews.Reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state, 
                ...allReviews,
                list:(action.reviews)
            };
        }
        case CREATE_REVIEW: {
            const allReviews = {...state, [action.review.id]: action.review}
            const finalReviews = []
            for (let key in allReviews) {
                finalReviews.push(allReviews[key])
              }
              return {...allReviews,
            list:(finalReviews)}
            
        }
        case DELETE_REVIEW: {
            
            let newList = []
          state.list.Reviews.forEach(review => {
            if (review.id !== action.reviewId) {
              newList.push(review)
            }
          })
          let deleteState = {...state}
          deleteState.list = newList
          return deleteState

        }
        default:
            return state;
    }
}
export default reviewsReducer