import { useState, useEffect, useRef } from 'react'
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import spotsReducer, { getSingleSpot } from '../../store/spots'
import { SpotReviews } from '../../store/reviews'
import PostReviewModal from '../Modals/PostReviewModal'
import { CreateReview } from '../../store/reviews'
import DeleteReviewModal from '../Modals/DeleteReview'
import { DeleteReview } from '../../store/reviews'
import './spotDetail.css'


//reviews plural

const SpotDetail = () => {
    const imageUrl = 'https://as2.ftcdn.net/v2/jpg/02/79/95/39/1000_F_279953994_TmVqT7CQhWQJRLXev4oFmv8GIZTgJF1d.jpg'
    const [showModal, setShowModal] = useState(false);
    const [review, setUserReview] = useState('')
    const [stars, setUserRating] = useState('')
    const [errors, setErrors] = useState([]);
    const [deleteReviewId, setDeleteReviewId] = useState(null)
    // const[modal, setModal] = useState(false)


    // these Two function handle the opeaning and closing of Review Form.

    const dispatch = useDispatch()
    const { spotId } = useParams()

    const current = useSelector(state => state.session.user)
    // console.log (current, '------------------this is current')
    const detailState = useSelector(state => state)

    // console.log (detailState, '----------------------detail state')
    const spot = useSelector(state => state.spots[spotId])
    // console.log (spot, '------------this is spot')
    // console.log(spot, '------------this is spot')


    const reviews = useSelector(state => state.reviews.list.Reviews)

    // console.log (reviews, '---------------this is reviews')


    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(SpotReviews(spotId))
    }, [dispatch])
    let showReview = false

    if (reviews) {

        if (reviews.length) {
            if (reviews.length > 0) {
                showReview = true
            }
        }
    }

    let showFirstReviewButton = false
    // console.log (spot)

    if (current && spot) {
        // console.log (current.id, '------------------userId------')
        if (current.id !== spot.ownerId) {
            showFirstReviewButton = true
        }
    }
    // console.log (spot.ownerId, '---------------spotOwnerId----------------')





    // console.log(reviews, '---------------')
    // console.log (typeof reviews)
    const newRating = (rating) => {
        setUserRating(rating)
    }
    const handleShowModal = () => {
        setShowModal(true);
        setUserRating(0)
        // console.log (rating,'--------------in the show')
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setErrors({});
        newRating(0)
        setUserRating('')
        console.log(stars, '--------------in the close--------')
        setUserReview('')
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



    let content;
    

    const checkReviewLength = (review, rating) => {
        if (review.length < 10 || !rating) {
           
            return true
        }
        
        return false
    }

    // Modal for delete 

    // here we add Modal to the current as a default value if a user is logged in
    if (current && spot) {
        content = <>
            <div>
                <div className='spt-det-post-review-btn'>

                    <button onClick={handleShowModal}>Post your review</button>
                </div>
                <PostReviewModal show={showModal} handleClose={handleCloseModal}>


                    <>
                        <ul>
                            {Object.keys(errors).map((key) => (
                                <li key={key}>{errors[key]}</li>
                            ))}
                        </ul>
                        <div className='cre-rev-ctn'>

                            <p className='cre-rev-heading'>How was your stay?</p>
                            <form onSubmit={handleNewReview}>
                                <div className='cre-rev-txt-area-ctn'>

                                    <textarea value={review} minLength='10' placeholder='Leave your review here...' onChange={
                                        (e) => setUserReview(e.target.value)} className='cre-rev-txt-area'></textarea>
                                </div>
                                <div className='cre-rev-rat-ctn'>


                                    <div className='cre-rev-rat-ctn-stars'>
                                        <ReactStars
                                            value={stars}
                                            size={15}
                                            count={5}

                                            onChange={newRating} /> <p>stars</p>
                                    </div>
                                    

                                </div>
                                <div className='cre-rev-sub-butn-ctn'>

                                <button type='Submit' disabled={checkReviewLength(review, stars)}>Submit Your Review</button>
                                </div>
                                {/* <button onClick={handleCloseModal}>Close</button> */}
                            </form>
                        </div>

                    </>
                </PostReviewModal>
            </div>
        </>
        // here we check if the current user ownes the spot and if not do they already have a review for this spot. if any correct the post review button will stay hidden. 
        for (let key in reviews) {

            // console.log (current.id, '---------user')
            console.log(reviews[key].User.id)
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
        console.log(spot, '-----------this is spot')
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

            // if (spot.avgRating > 0) {
            //     showRating = spot.avgRating
            // }
            // if (spot.avgRating='New') {
            //     showRating = ''
            // }

        }



        reviewPlural()
        // console.log(spot)
        return (
            <>


                <div key={spot.key} className='upper-part-spot'>


                    <div className='user-spot-info'>

                        <h3>{spot.name}</h3>
                        <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                    </div>
                    <div className='spot-det-images'>
                        {spot.SpotImages.map((image, index) => {
                            if (image.url && image.preview) {
                                return (
                                    <>
                                        <div className='spt-det-prev-img'>

                                            <img src={image.url} />
                                        </div>
                                    </>

                                )
                            }
                            // Only show images if they have a URL
                            if (image.url && !image.preview) {
                                return (

                                    <img src={image.url} className='spt-det-thumb'></img>
                                );
                            } else {
                                return null;
                            }
                        })}

                    </div>
                    <div className='spt-det-lower-info'>

                        <div className='spt-det-lower-info-hst-des'>

                            <p className='spt-det-hst'>Hosted by: {spot.Owner.firstName}, {spot.Owner.lastName}</p>
                            <p className='spt-det-desc'>{spot.description}</p>
                        </div>
                        <div className='spt-det-price-info'>
                            <div className='lower-callout-box'>

                                <div className='spt-det-callout'>
                                    <p className='spt-det-night-abv'><span className='spt-det-price-1'>${spot.price}</span> night</p>
                                    <div className='spt-rtn-call'>

                                        <i class="fa-solid fa-star"></i> <p> {!spot.avgStarRating ? <div></div> : <div>{spot.avgStarRating.toFixed(1)}</div>}</p>
                                        <p className='spt-det-revs'>{reviewWord}</p>
                                    </div>
                                </div>
                                <div className='reserve-butt'>

                                    <button onClick={comingSoon} >Reserve</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='spt-det-divider'></div>




                    <div className='reviews-price-info'>
                        <div className='spt-det-callout-lower'>
                            <p className='spt-det-night-abv spt-det-night-bot'><span className='spt-det-price-1'>${spot.price}</span> night</p>
                            <div className='spt-rtn-call spt-rtn-call-bott'>

                                <i class="fa-solid fa-star"></i> <p> {!spot.avgStarRating ? <div></div> : <div>{spot.avgStarRating.toFixed(1)}</div>}</p>
                                <p className='spt-det-revs'>{reviewWord}</p>
                            </div>
                        </div>
                    </div>
                </div>


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
                                    handleCloseModal()
                                    dispatch(DeleteReview(reviewToBeDelete))
                                    dispatch(getSingleSpot(spotId))
                                    dispatch(SpotReviews(spotId))

                                }

                                // console.log (review.User.id, '---------------------------')  console.log ('hello')       
                                // reviewToBeDelete = review.User.id
                                // console.log (reviewToBeDelete, '--------this is after----')
                                // setDeleteReviewId(review.User.id)
                                deleteReview = <>
                                    <div>
                                        <button onClick={handleShowModal} className='spt-det-rev-button-btn'>Delete</button>
                                        <DeleteReviewModal show={showModal} handleClose={handleCloseModal}>
                                            <>

                                                <p className='del-rev-hdn'>Confirm Delete</p>

                                                <p className='del-rev-sub-hdn'>Are you sure you want to delete this review?</p>
                                                <div className='rev-del-sub-btn-ctn'>

                                                <button className='rev-del-sub-btn' onClick={onDeleteHandle}>Yes(Delete Review)</button>
                                                </div>
                                            </>
                                        </DeleteReviewModal>
                                    </div>
                                </>
                            }

                            return (
                                <>
                                    <div className='spt-det-rev-ctn'>

                                        <div key={review.id} >
                                            <p className='spt-det-rev-user'>{review.User.firstName}</p>
                                            <p className='spt-det-rev-date'>{formattedDate}</p>
                                            <p className='spt-det-rev-review'>{review.review}</p>
                                            <div className='spt-det-rev-button'>
                                                {deleteReview}
                                            </div>
                                        </div>
                                    </div>


                                </>

                            );

                        })
                ) : (<>
                    {showFirstReviewButton ? (

                        <div className='spt-det-first-rev'>
                            <p>Be the first to post a review!!</p>

                        </div>
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
