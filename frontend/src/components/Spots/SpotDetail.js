import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSingleSpot } from '../../store/spots'
import { SpotReviews } from '../../store/reviews'

//reviews plural

const SpotDetail = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => state.reviews.list.Reviews)
    // console.log(reviews[0].id, '---------------------------reviews')


    const comingSoon = () => { // Feature coming soon funct
        alert('feature is coming soon')
    }

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(SpotReviews(spotId))
    }, [dispatch])

    if (spot && spot.Owner) {
        let allSpotReviews;
        if (reviews) {
            const allSpotReviews = [...reviews]
        } else {
            allSpotReviews = []
        }
        let reviewWord = ''
        function reviewPlural() {
            const totalReviews = spot.numReviews
            if (totalReviews > 1) { reviewWord = `· ${totalReviews} Reviews` }
            if (totalReviews === 1) { reviewWord = ' · 1 Review' }

            if (!totalReviews || totalReviews === 0) { reviewWord = 'There are no reviews yet for this spot' }
        }


        reviewPlural()
        console.log(spot)
        return (
            <>
                <div>
                    <h1>{spot.name}</h1>
                    <h2>Location: {spot.city}, {spot.state}, {spot.country}</h2>
                    <div>
                        <div>BigImage</div>
                        <div>Small Image 1</div>
                        <div>Small Image 2</div>
                        <div>Small Image 3</div>

                    </div>
                    <h3>Hosted by: {spot.Owner.firstName}, {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                    <div>
                        <p>${spot.price} night</p>
                        <p>{reviewWord}</p>
                        <p>stars {spot.avgStarRating}</p>
                        <button onClick={comingSoon}>Reserve</button>
                    </div>


                </div>
                <div>
                    <p>${spot.price} night</p>
                    <p>{reviewWord}</p>
                    <p>stars {spot.avgStarRating}</p>
                </div>
              
              {reviews ? (
                // console.log (reviews[0])
                reviews.map((review) => (
                    <div key={review.id}>
                        <h3>{review.User.firstName}</h3>
                        <p>{review.createdAt}</p>
                        <p>{review.review}</p>
                    </div>
                ))
              ) : (
                <p>No review found</p>
              )}
            </>


        )
    }
    return (
        <h1>Hello</h1>
    )
}


export default SpotDetail
