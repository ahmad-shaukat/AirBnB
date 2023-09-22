import { useState, useEffect } from 'react'
import { Link } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import spotsReducer, { getAllSpots } from '../../store/spots'
import { useDispatch } from 'react-redux'
import './landingPage.css'
// impot {}

const SpotBrowser = () => {

    const dispatch = useDispatch()
    const allSpots = useSelector(state => {


        return state.spots?.list?.Spots;


    });


    useEffect(() => {

       
        dispatch(getAllSpots())

    }, [dispatch])
   

    if (allSpots) {
        



        return (

            <>
                <div className='spot'>

                    {allSpots.map((spot) => (

                        <div key={spot.id} className='spot-detail' id='parent'>
                            <p className='main-spot-name'>{spot.name}</p>

                            <NavLink to={`/spots/${spot.id}`}>
                                

                                    <div className='image-div'>
                                        <img src={spot.previewImage} className='img' />

                                    </div>


                                    <div className='location-rating'>
                                        <p className=''>{spot.city}, {spot.state}</p>
                                        <div className='rating-star'>

                                            <i class="fa-solid fa-star"></i><p>{!spot.avgRating?<div>New</div>:<div>{spot.avgRating.toFixed(1)}</div> }</p>
                                        </div>
                                    </div>
                                    <p className='price'>${spot.price} Night</p>

                                {/* </div> */}


                                {/* </div> */}
                            </NavLink>



                        </div>


                    ))}
                </div>

            </>




        )
    }

    return (
        <>
            <h1>Loading</h1>
        </>

    )



}
export default SpotBrowser