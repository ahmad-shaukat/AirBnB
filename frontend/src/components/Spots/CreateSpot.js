import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreateSpot } from '../../store/spots';

const CreateSpotForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [name, setName] = useState('')
    const [numReviews, setNumReviews] = useState('')
    const [ownerId, setOwnerId] = useState(null)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)

    const updateAdress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity (e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateNumReviews = (e) => setNumReviews(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateOwnerId = (e) => setOwnerId(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)



    // submit function 
    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const spot = {
            name, 
            address,
            city,
            state,
            country,
            lat,
            lng,
            description,
            price

        }
        console.log (spot)
        try {
               let createdSpot = await dispatch(CreateSpot(spot))
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
        } catch (error) {
            console.error(error)
        }
     
    }

    return (
        <>
        <h1>Create New Spot</h1>
        {<form onSubmit={handleSubmit}>
            <input 
            type='text'
            placeholder='Enter Name'
            onChange={updateName}/>
            <input 
            type='text'
            placeholder='Enter Address'
            onChange={updateAdress}/>  
            <input 
            type='text'
            placeholder='Enter City'
            onChange={updateCity}/>  
            <input 
            type='text'
            placeholder='Enter State'
            onChange={updateState}/>  
            <input 
            type='text'
            placeholder='Enter Country'
            onChange={updateCountry}/>  
            <input 
            type='number'
            placeholder='Enter Latitude'
            onChange={updateLat}/>  
            <input 
            type='number'
            placeholder='Enter Longitude'
            onChange={updateLng}/>  
            <textarea 
            type='text'
            placeholder='Enter Description'
            onChange={updateDescription}/>
            <input 
            type='number'
            placeholder='Enter Price'
            onChange={updatePrice}/>  
            <button type='submit'>Create New Spot</button>
            <button type='button'>Cancel</button>
            </form>}
        </>
            
           
            
            
            
    )


}
export default CreateSpotForm