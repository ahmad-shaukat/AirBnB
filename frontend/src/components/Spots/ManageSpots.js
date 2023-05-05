import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserSpots } from "../../store/spots";

const ManageSpotsFunction = () => {
    const dispatch = useDispatch()
    const userSpots = useSelector(state => {
        return state.spots.list.Spots
    })
    console.log(userSpots)
    useEffect(() => {
        console.log('befor the useEffect')
        dispatch(UserSpots())
        console.log('after the effect')

    }, [dispatch])

    if (userSpots) {
        console.log (userSpots)
        return (
            <>
            <h1>Manage Spots</h1>
               
                {userSpots.map((spot) => (
                    <NavLink to ={`/spots/${spot.id}`}>

                    <div key={spot.key}>
                        <h4>Image goes Here</h4>
                        <h5>{spot.city}, {spot.state}</h5>
                        <h5>stars {spot.avgRating}</h5>
                        <h5>${spot.price} night</h5>
                        <button type='button'>Delete</button>
                        <button type='button'>Update</button>
                    </div>
                    </NavLink>
                        
                ))
    
               }
            </>
        )
    }

   return (
    <NavLink to={'spots/add/newspot'}>Create New Spot</NavLink>
   )
}


export default ManageSpotsFunction