const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

const load = (reviews, spotId) => ({
    type:LOAD_REVIEWS,
    reviews,
    spotId,

})


export const SpotReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(load(reviews, spotId))
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
        default:
            return state;
    }
}
export default reviewsReducer