import { useState, useEffect } from 'react'
import { Link } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import spotsReducer, { getAllSpots } from '../../store/spots'
import { useDispatch } from 'react-redux'

const SpotBrowser = () => {

    const dispatch = useDispatch()
    const allSpots = useSelector(state => {
        return state.spots.list.Spots;
    });

    // console.log (typeof allSpots)
    // console.log (allSpots)
    useEffect(() => {

        console.log('in the effect')
        dispatch(getAllSpots())

    }, [dispatch])

    if (allSpots) {
        for (let items of allSpots) {
            if (!items['avgRating']) items['avgRaing'] = 'New'
        }
        console.log(allSpots, '---------')


        return (
            allSpots.map((spot) => (


                
                    <div key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`}>
                            <p>Image goes here</p>
                            <div>
                                <p>{spot.city}, {spot.state}</p>
                                <p></p>

                                <p>Price: {spot.price} Night</p>
                                <p>Average Rating: {spot.avgRating}</p>
                            </div>
                        </NavLink>
                        <p>---------------------</p>

                    </div>
                

            ))
        )
    }

    return (
        <>
            <h1>Error</h1>
        </>

    )



}
export default SpotBrowser