import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSingleSpot } from '../../store/spots'
import { SpotReviews } from '../../store/reviews'
import PostReviewModal from '../PostReview/PostReviewModal'
import { CreateReview } from '../../store/reviews'
import DeleteReviewModal from '../PostReview/DeleteReview'
import { DeleteReview } from '../../store/reviews'
// import { set } from '../../../../backend/app'
// import AddReviewModal from '../PostReview'
// const 


//reviews plural

const SpotDetail = () => {
    const imageUrl = 'https://as2.ftcdn.net/v2/jpg/02/79/95/39/1000_F_279953994_TmVqT7CQhWQJRLXev4oFmv8GIZTgJF1d.jpg'
    const [showModal, setShowModal] = useState(false);
    const [review, setUserReview] = useState('')
    const [stars, setUserRating] = useState(null)
    const [errors, setErrors] = useState([]);
    const [deleteReviewId, setDeleteReviewId] = useState(null)


    // these Two function handle the opeaning and closing of Review Form.

    const dispatch = useDispatch()
    const { spotId } = useParams()

    const current = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots[spotId])


    const reviews = useSelector(state => state.reviews.list.Reviews)


    let showReview = false
    console.log(spot, '-----------------------')
    // getting all the spot images 
    // if (spot) {
    //     let allSpotImages = []
    //     for (let images of spot.SpotImages) {
    // console.log (images)

    //     }

    // }


    if (reviews) {
        // console.log(reviews.length, '-------------------------------------------')
        // console.log (current)

        if (reviews.length) {
            // console.log(reviews.length, '---------this is the length--------')
            if (reviews.length > 0) {
                showReview = true
            }
        }
    }


    // if (reviews.length < 0) {
    //     showReview = true

    // }
    let showFirstReviewButton = false

    if (current) {
        // console.log (current.id, '------------------userId------')
        if (current.id !== spot.ownerId) {
            showFirstReviewButton = true
        }
    }
    // console.log (spot.ownerId, '---------------spotOwnerId----------------')





    // console.log(reviews, '---------------')
    // console.log (typeof reviews)
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(SpotReviews(spotId))
    }, [dispatch])
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setErrors({});
    }

    const handleNewReview = async (e) => {
        e.preventDefault()


        const payload = {
            review,
            stars
        }
        // console.log(payload, '-------------------this is payload')

        try {
            let newCreatedReview = await
                dispatch(CreateReview(payload, spotId))
            dispatch(getSingleSpot(spotId))
            dispatch(SpotReviews(spotId))
            handleCloseModal()
            setUserReview('') // clear form field
            setUserRating(null) // clear form field
            setErrors = ([])

        } catch (res) {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
            }
            console.log(data.errors)
        }

    }

    let reviewToBeDelete;

    // const deleteReviewHandle = (reviewToBeDelete) => {
    //     console.log (reviewToBeDelete, '----------in the function----------')
    //     dispatch(DeleteReview(review.id))
    // }

    // console.log (current.id, '-----------current user id-----------')
    // console.log (spot.ownerId, '-------------current spot owner id')
    // console.log ()



    let content = null

    // Modal for delete 




    // here we add Modal to the current as a default value if a user is logged in
    if (current) {
        content = <>
            <div>
                <button onClick={handleShowModal}>Post your review</button>
                <PostReviewModal show={showModal} handleClose={handleCloseModal}>


                    <>

                        <h1>How was your stay?</h1>
                        <ul>
                            {Object.keys(errors).map((key) => (
                                <li key={key}>{errors[key]}</li>
                            ))}
                        </ul>
                        <form onSubmit={handleNewReview}>
                            <div>

                                <textarea minLength='10' placeholder='Leave your review here...' onChange={(e) => setUserReview(e.target.value)}></textarea>
                            </div>
                            <div>

                                <label>  Stars:
                                    <input type='number' min='1' max='5' onChange={(e) => setUserRating(e.target.value)} />
                                </label>
                            </div>
                            <button type='Submit'>Submit Your Review</button>
                        </form>
                    </>
                </PostReviewModal>
            </div>
        </>
        // here we check if the current user ownes the spot and if not do they already have a review for this spot. if any correct the post review button will stay hidden. 
        for (let key in reviews) {

            if (current.id === reviews[key].User.id) {
                console.log(current.id, '------------------userId')
                // console.log(reviews[key].User.id, '----reviews user Id------')
                content = null

            }


        }
        if (current.id === spot.ownerId) {
            content = null
        }

    }


    const comingSoon = () => { // Feature coming soon funct
        alert('feature is coming soon')
    }

    // console.log (spot, spot.Owner)

    if (spot && spot.Owner) {
        let allSpotReviews;
        let showRating
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

            if (!totalReviews || totalReviews === 0) {
                reviewWord = 'New'
            }

            if (spot.avgRating > 1) {
                showRating = spot.avgRating.toFixed(1)
            }
            if (spot.avgRating = 'New') {
                showRating = ''
            }

        }



        reviewPlural()
        // console.log(spot)
        return (
            <>
                <div key={spot.key}>
                    <h1>{spot.name}</h1>
                    <h2>Location: {spot.city}, {spot.state}, {spot.country}</h2>
                    <div>
                        {spot.SpotImages.map((image, index) => {
                            if (image.url && image.preview) {
                                return (

                                    <img src={image.url} />
                                )
                            }
                            // Only show images if they have a URL
                            if (image.url && !image.preview) {
                                return (

                                    <img src={image.url}></img>
                                );
                            } else {
                                return null;
                            }
                        })}

                    </div>
                    <h3>Hosted by: {spot.Owner.firstName}, {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                    <div>
                        <p>${spot.price} night</p>
                        <p>stars {showRating}</p>
                        <p>{reviewWord}</p>
                        <button onClick={comingSoon}>Reserve</button>
                    </div>
                    <p>-------------------------Reviews and Rating Info-----------------------------</p>


                </div>
                <div>
                    <p>${spot.price} night</p>
                    <p>{reviewWord}</p>
                    <p>stars {showRating}</p>
                </div>

                <p>------------------------------Reviews--------------------------------------------</p>

                {content}




                {showReview ? (
                    // console.log (reviews[0])
                    reviews
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((review) => {
                            let deleteReview = null
                            const date = new Date(review.createdAt);
                            const options = { month: 'long', year: 'numeric' };
                            const formattedDate = date.toLocaleString('en-US', options);
                            // console.log (reviewToBeDelete, '----------this is before-----')
                            // console.log (review, '-------------------------')
                            if (current && current.id === review.User.id) {
                                reviewToBeDelete = review.id
                                // console.log (reviewUserId, '-------------')
                                let thisIs = review.User.id
                                // console.log (thisIs)


                                function onDeleteHandle() {
                                    // setDeleteReviewId(review.id)
                                    // console.log (deleteReviewId, '-------------')
                                    // console.log (thisIs, '---this is user----')
                                    dispatch(DeleteReview(reviewToBeDelete))
                                    dispatch(getSingleSpot(spotId))
                                    dispatch(SpotReviews(spotId))
                                    handleCloseModal()

                                }

                                // console.log (review.User.id, '---------------------------')  console.log ('hello')       
                                // reviewToBeDelete = review.User.id
                                // console.log (reviewToBeDelete, '--------this is after----')
                                // setDeleteReviewId(review.User.id)
                                deleteReview = <>
                                    <div>
                                        <button onClick={handleShowModal}>Delete</button>
                                        <DeleteReviewModal show={showModal} handleClose={handleCloseModal}>
                                            <>

                                                <h1>Confirm Delete</h1>

                                                <h5>Are you sure you want to delete this review</h5>

                                                <button style={{ backgroundColor: 'red', color: 'white' }} onClick={onDeleteHandle}>Delete</button>
                                            </>
                                        </DeleteReviewModal>
                                    </div>
                                </>
                            }

                            return (
                                <>


                                    <div key={review.id}>
                                        <h3>{review.User.firstName}</h3>
                                        <p>{formattedDate}</p>
                                        <p>{review.review}</p>
                                        <div>
                                            {deleteReview}
                                        </div>
                                    </div>

                                </>

                            );

                        })
                ) : (<>
                    {showFirstReviewButton ? (
                        <p>Be the first to post a review</p>
                    ) : null}

                </>
                )}
            </>


        )
    }
    return (
        <h1>Loading</h1>
    )
}


export default SpotDetail
