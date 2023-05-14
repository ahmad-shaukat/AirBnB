import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserSpots } from "../../store/spots";
import EditSpotForm from '../editSpot/EditSpot'
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
    // if(userSpots) {

    // }

    if (editSpotId && editSpot && showEditSpotForm) {
        content = (
            <EditSpotForm spot={editSpot} spotId={editSpotId} hideForm={() => setShowEditSpotForm(false)} />
        )
    } else {
        let mngRating;
        if (userSpots) {
            for (let items of userSpots) {
                // let mngRating;
                // console.log (items, '-----------this is spot')
                // console.log (items.avgRating, '------------this is rating')

                if (!items['avgStarRating']) {
                    let mngRating = 'New'
                } else {
                    mngRating = items['avgStarRating']
                }
                // if (typeof(items['avgRating']) === 'number') {
                //     let newNumber = items['avgRating']
                //     // newNumber = newNumber.toFixed(1)
                //     newNumber = ((newNumber)/100).toFixed(1)
                //     // newNumber = parseFloat(newNumber)

                //     // items['avgRating'] = parseFloat(newNumber.toFixed(1))
                //     console.log (newNumber, '---changed item--------------')
                // } 
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

                                            <i class="fa-solid fa-star"></i><p>{!spot.avgRating ? <div>New</div>:<div>{spot.avgRating.toFixed(1)}</div> }</p>
                                        </div>
                                    </div>
                                    <p className='mng-spt-per-night'>${spot.price} night</p>
                                </NavLink>
                                <div className='mng-btns'>

                                    <button onClick={handleShowModal} style={{cursor:'pointer'}} className='del-spt-init-btn'>Delete</button>

                                    <DeleteSpotModal show={showModal} handleClose={handleCloseModal}>
                                        <>
                                            <div className='del-spt-main-ctn'>
                                                <div className='del-spt-hed-ctn'>


                                                <p className='del-spt-hed-main'>Confirm Delete</p>

                                                <p className='del-spt-hed-sub'>Are you sure you want to delete this spot?</p>
                                                </div>
                                                <div className='del-spt-btns'>
                                                    <div className='del-spot-btns-del'>

                                                <button onClick={() => onDeleteHandle(spot.id)} >Yes(Delete Spot)</button>
                                                    </div>
                                                    <div className='del-spot-btns-can'>

                                                <button onClick={handleCloseModal}>No(Keep Spot)</button>
                                                    </div>


                                                </div>
                                            </div>


                                        </>
                                    </DeleteSpotModal>
                                    {/* <EditSpotForm spot={editSpot} spotId={editSpotId} /> */}
                                    <button onClick={() => {


                                        setEditSpot(spot)
                                        setEditSpotId(spot.id)
                                        setShowEditSpotForm(true)

                                    }} style={{cursor:'pointer'}}>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )
        }
        // <button type='button' onClick={() => onDeleteHandle(spot.id)}>Delete</button>

    }
    if (userSpots && userSpots.length < 1) {
        content = <>
        <div className='mng-spot-cre-spt-btn-ctn'>

            <NavLink to='/spots/add/newspot' className='mng-spot-cre-spt-btn'> Create a New Spot</NavLink>
        </div>
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