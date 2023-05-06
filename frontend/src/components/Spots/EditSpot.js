import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { EditSpot } from "../../store/spots"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
// import spot from "../../../../backend/db/models/spot"


const EditSpotForm = ({ spot, hideForm  }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lng, setLng] = useState(spot.lng)
    const [lat, setLat] = useState(spot.lat)
    const [name, setName] = useState(spot.name)
    // const [numReviews, setNumReviews] = useState('')
    // const [ownerId, setOwnerId] = useState(null)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)



    const updateAdress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateName = (e) => setName(e.target.value)
    // const updateNumReviews = (e) => setNumReviews(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    // const updateOwnerId = (e) => setOwnerId(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...spot,
            address,
            city,
            state,
            country,
            lng,
            lat,
            name
        }
        console.log (payload)
        let updatedSpot = await 
        dispatch(EditSpot(payload, spot.id))
        console.log ('after the dispatch')
        if (updatedSpot) {
            history.push(`/spots/${spot.id}`)
            hideForm();
            
        }
    }
    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
      };
    return (
        <>
            <h1>Edit Spot</h1>
            {<form onSubmit={handleSubmit}>
                <input
                    type='text'
                    // placeholder='Enter Name'
                    value={name}
                    onChange={updateName} />
                <input
                    type='text'
                    // placeholder='Enter Address'
                    value={address}
                    onChange={updateAdress} />
                <input
                    type='text'
                    // placeholder='Enter City'
                    value={city}
                    onChange={updateCity} />
                <input
                    type='text'
                    // placeholder='Enter State'
                    value={state}
                    onChange={updateState} />
                <input
                    type='text'
                    // placeholder='Enter Country'
                    value={country}
                    onChange={updateCountry} />
                <input
                    type='number'
                    // placeholder='Enter Latitude'
                    value={lat}
                    onChange={updateLat} />
                <input
                    type='number'
                    // placeholder='Enter Longitude'
                    value={lng}
                    onChange={updateLng} />
                <textarea
                    type='text'
                    // placeholder='Enter Description'
                    value={description}
                    onChange={updateDescription} />
                <input
                    type='number'
                    // placeholder='Enter Price'
                    value={price}
                    onChange={updatePrice} />
                <button type='submit'>Update</button>
                <button type='button' onClick={handleCancelClick}>Cancel</button>
            </form>}
        </>
    )
}









export default EditSpotForm