import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserSpots } from "../../store/spots";
import EditSpotForm from '../editSpot/EditSpot'
import { RemoveSpot } from '../../store/spots';
import DeleteSpotModal from '../Modals/DeleteSpot';
import './manageSpot.css'
import Modal from '../Modals/DeleteSpot';

const ManageSpotsFunction = () => {
    const [showModal, setShowModal] = useState(false);
    // const [showEditSpotForm, setShowEditSpotForm] = useState(false)
    const [editSpotId, setEditSpotId] = useState(null)
    const [showEditSpotForm, setShowEditSpotForm] = useState(false)
    const [editSpot, setEditSpot] = useState(null)
    const [delSpot, setDelSpot] = useState(null)
    const dispatch = useDispatch()
    const userSpots = useSelector(state => {
        return state.spots.list?.Spots
    })
    useEffect(() => {
        setShowEditSpotForm(false)
        dispatch(UserSpots())


    }, [dispatch])
 
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        
    }
    const onDeleteHandle = (spotIdRemove) => {

        handleCloseModal()
        dispatch(RemoveSpot(spotIdRemove))
        dispatch(UserSpots())
    }
    let content = null




    if (editSpotId && editSpot && showEditSpotForm) {
        content = (
            <EditSpotForm spot={editSpot} spotId={editSpotId} hideForm={() => setShowEditSpotForm(false)} />
        )
    } else {
        let mngRating;
        if (userSpots) {
            for (let items of userSpots) {
                

                if (!items['avgStarRating']) {
                    let mngRating = 'New'
                } else {
                    mngRating = items['avgStarRating']
                }
                
            }

            content = (
                <>
                    <h1 className='mng-heading'>Manage Spots</h1>
                    <div className='mng-spot-contn'>

                        {userSpots.map((spot) => (
                            
                                
                            <div key={spot.key} className='mng-spot-dtl'>
                                <NavLink to={`/spots/${spot.id}`}>
                                    <div className='mng-img-div'>
                                        <img className='mng-img' src={spot.previewImage} />

                                    </div>
                                    <div className='mng-ratings'>

                                        <p>{spot.city}, {spot.state}</p>
                                        <div className='mng-rating-str'>

                                            <i class="fa-solid fa-star"></i><p>{!spot.avgRating ? <div>New</div> : <div>{spot.avgRating.toFixed(1)}</div>}</p>
                                        </div>
                                    </div>
                                    <p className='mng-spt-per-night'>${spot.price} night</p>
                                </NavLink>
                                
                                <div className='mng-btns'>
                                    
                                <Modal spotId={spot.id} />
                                    
                                  
                                    <button onClick={() => {


                                        setEditSpot(spot)
                                        setEditSpotId(spot.id)
                                        setShowEditSpotForm(true)

                                    }} style={{ cursor: 'pointer' }}>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )
        }

    }
    if (userSpots && userSpots.length < 1) {
        content = <>
            <div className='mng-spot-cre-spt-btn-ctn'>

                <NavLink to='/spots/add/newspot' className='mng-spot-cre-spt-btn'> Create a New Spot</NavLink>
            </div>
        </>
    }



    if (userSpots) {
        
        return (
            <div>
                {content}
            </div>
            

        )

    } 
    
    
    
}


export default ManageSpotsFunction