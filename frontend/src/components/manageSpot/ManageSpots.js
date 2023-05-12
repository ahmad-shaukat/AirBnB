import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserSpots } from "../../store/spots";
import EditSpotForm from '../Spots/EditSpot';
import { RemoveSpot } from '../../store/spots';
import DeleteSpotModal from '../Modals/DeleteSpot';
import './manageSpot.css'

const ManageSpotsFunction = () => {
    const [showModal, setShowModal] = useState(false);
    // const [showEditSpotForm, setShowEditSpotForm] = useState(false)
    const [editSpotId, setEditSpotId] = useState(null)
    const [showEditSpotForm, setShowEditSpotForm] = useState(false)
    const [editSpot, setEditSpot] = useState(null)
    const dispatch = useDispatch()
    const userSpots = useSelector(state => {
        return state.spots?.list?.Spots
    })
    console.log(userSpots, '---------------------')
    useEffect(() => {
        console.log('hello')
        setShowEditSpotForm(false)
        dispatch(UserSpots())


    }, [dispatch])
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        // setErrors({});
    }
    const onDeleteHandle = (spotId) => {
        
        handleCloseModal()
        dispatch(RemoveSpot(spotId))
        dispatch(UserSpots())
    } 
    let content = null

    if (editSpotId && editSpot && showEditSpotForm) {
        content = (
            <EditSpotForm spot={editSpot} spotId={editSpotId} hideForm={() => setShowEditSpotForm(false)} />
        )
    } else {
        if (userSpots) {
            content = (
            <>
                <h1>Manage Spots</h1>
    
                {userSpots.map((spot) => (
                    
                    <div key={spot.key}>
                        <NavLink to={`/spots/${spot.id}`}>
                            <h4>Image goes Here</h4>
                            <h5>{spot.city}, {spot.state}</h5>
                            <h5>stars {spot.avgRating}</h5>
                            <h5>${spot.price} night</h5>
                        </NavLink>
                        <button onClick={handleShowModal}>Delete ntis</button>
                        
                        <DeleteSpotModal show={showModal} handleClose={handleCloseModal}>
                                            <>
                                            <div>

                                                <h1>Confirm Delete</h1>

                                                <h5>Are you sure you want to delete this review</h5>

                                                <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onDeleteHandle(spot.id)}>Delete</button>
                                            </div>

                                            </>
                                        </DeleteSpotModal>
                        {/* <EditSpotForm spot={editSpot} spotId={editSpotId} /> */}
                        <button onClick={() => {
                           
                            
                            setEditSpot(spot)
                            setEditSpotId(spot.id)
                            setShowEditSpotForm(true)
                            
                        }}>Edit</button>
                    </div>
                ))}
            </>
        )
    }
    // <button type='button' onClick={() => onDeleteHandle(spot.id)}>Delete</button>
    
    }
if (userSpots && userSpots.length <1 ) {
    content = <>
    <NavLink to='/spots/add/newspot'> Add a Spot</NavLink>
    </>
}



if (userSpots) {
    // console.log(userSpots)
    return (
        <div>
            {content}
        </div>
        // <>
 
    )

} else {
    return (
        <h1>Loading...</h1>
    )
}

}


export default ManageSpotsFunction