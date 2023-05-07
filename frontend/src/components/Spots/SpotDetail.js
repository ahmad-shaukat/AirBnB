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

            if (current.id === reviews[key].User.id || current.id === spot.ownerId) {
                // console.log(reviews[key].User.id, '----reviews user Id------')
                content = null

            }


        }

    }


    const comingSoon = () => { // Feature coming soon funct
        alert('feature is coming soon')
    }

    // console.log (spot, spot.Owner)

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
        // console.log(spot)
        return (
            <>
                <div key={spot.key}>
                    <h1>{spot.name}</h1>
                    <h2>Location: {spot.city}, {spot.state}, {spot.country}</h2>
                    <div>
                        <div><img src={imageUrl} /></div>
                        <div style={{ display: 'inline-block', width: '30%' }}>
                            <img src={imageUrl} alt="Small Image 1" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                        <div style={{ display: 'inline-block', width: '30%', height: '10%' }}>
                            <img src={imageUrl} alt="Small Image 2" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                        <div style={{ display: 'inline-block', width: '30%', height: '10%' }}>
                            <img src={imageUrl} alt="Small Image 3" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>

                    </div>
                    <h3>Hosted by: {spot.Owner.firstName}, {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                    <div>
                        <p>${spot.price} night</p>
                        <p>{reviewWord}</p>
                        <p>stars {Math.ceil(spot.avgStarRating * 100) / 100}</p>
                        <button onClick={comingSoon}>Reserve</button>
                    </div>
                    <p>-------------------------Reviews-----------------------------</p>


                </div>
                <div>
                    <p>${spot.price} night</p>
                    <p>{reviewWord}</p>
                    <p>stars {spot.avgStarRating}</p>
                </div>

                {content}
               


                {reviews ? (
                    // console.log (reviews[0])
                    reviews
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((review) => {
                            let deleteReview = null
                            const date = new Date(review.createdAt);
                            const options = { month: 'long', year: 'numeric' };
                            const formattedDate = date.toLocaleString('en-US', options);
                            console.log (reviewToBeDelete, '----------this is before-----')
                            // console.log (review, '-------------------------')
                            if (current && current.id === review.User.id) {
                                reviewToBeDelete = review.id
                                // console.log (reviewUserId, '-------------')
                                let thisIs = review.User.id
                                // console.log (thisIs)
                                
                                   
                                function onDeleteHandle () {
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
                                   deleteReview =  <>
                                   <div>
                                       <button onClick={handleShowModal}>Delete</button>
                                       <DeleteReviewModal show={showModal} handleClose={handleCloseModal}>
                                           <>
                               
                                               <h1>Confirm Delete</h1>
                               
                                               <h5>Are you sure you want to delete this review</h5>
                               
                                               <button style={{backgroundColor: 'red', color: 'white'}} onClick={onDeleteHandle}>Delete</button>
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
                            ) : (
                                <p>No review found</p>
                                )}
            </>


        )
    }
    return (
        <h1>Loading</h1>
    )
}


export default SpotDetail
