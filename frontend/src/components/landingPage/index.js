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


    // console.log (typeof allSpots)
    // console.log (allSpots)
    useEffect(() => {

        // console.log('in the effect')
        dispatch(getAllSpots())

    }, [dispatch])
    // let allSpots;

    // if (spots && spots.Spots)  {
    //     let allSpots = spots.Spots
    // }

    if (allSpots) {
        // for (let items of allSpots) {
        //     console.log (items, '-------------------is this avgRating')

        //     if (!items['avgRating']) items['avgRating'] = 'New'
        // }
        console.log (allSpots)



        return (

            <>
                <div className='spot'>

                    {allSpots.map((spot) => (
                        // console.log (spot, '-------------------')

                        <div key={spot.id} className='spot-detail'>

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