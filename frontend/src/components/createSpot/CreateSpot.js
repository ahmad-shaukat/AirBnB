import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreateSpot } from '../../store/spots';
import './createSpot.css'

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
    const [errors, setErrors] = useState({})
    const [previewImage, setPreviewImage]= useState('')
    const [Img1, setImg1] = useState('')
    const [Img2, setImg2] = useState('')
    const [Img3, setImg3] = useState('')
    // const [Img4, setImg4] = useState('')

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
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
            price,
            images:[previewImage, Img1, Img2, Img3]

        }
        // console.log (spot)
        
            let createdSpot = await dispatch(CreateSpot(spot)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
                // console.log(errors, '------------------')
            })
            if (createdSpot) {
                // console.log(createdSpot.id, '----------------------')
                history.push(`/spots/${createdSpot.id}`)
            }
      

    }

    return (
        <>
            <h1 className='create-heading'>Create New Spot</h1>
            {<form onSubmit={handleSubmit} className='create-form'>
                <div className='location'>
                    <h2>Where's is your place located?</h2>
                    <p>"Guests will only get your exact address once they booked a reservation"</p>
                    <div className='location-input-labels'>

                    <div className ='text-label'>
                        <label for='cheese'>
                            Country:
                            </label>
                            <input
                            id="cheese"
                                type='text'
                                placeholder='Enter Country'
                                onChange={updateCountry} />
                        {errors && errors.country &&
        <p style={{color:"red"}}>{errors.country}</p>}
                    </div>
                    <div className ='text-label'>
                        <label>
                            Street Address:
                            </label>
                            <input
                                type='text'
                                placeholder='Enter address'
                                onChange={updateAddress} />
                        {errors && errors.address &&
        <p style={{color:"red"}}>{errors.address}</p>}
                    </div>
                    <div className ='text-label'>
                        <label>
                            City:
                            </label>
                            <input
                                type='text'
                                placeholder='Enter City'
                                onChange={updateCity} />
                        {errors && errors.city &&
        <p style={{color:"red"}}>{errors.city}</p>}
                    </div>
                    <div className ='text-label'>
                        <label>State:
                            </label>
                            <input
                                type='text'
                                placeholder='Enter State'
                                onChange={updateState} />

                        {errors && errors.state &&
        <p style={{color:"red"}}>{errors.state}</p>}
                    </div>
                    <div className ='text-label'>
                        <label>Latitude(optional):
                            </label>
                            <input
                                type='number'
                                placeholder='Enter Latitude'
                                onChange={updateLat} />
                        {errors && errors.lat &&
        <p style={{color:"red"}}>{errors.lat}</p>}
                    </div>
                    <div className ='text-label'>
                        <label>Longitude(optional):
                            <input
                                type='number'
                                placeholder='Enter Longitude'
                                onChange={updateLng} />

                        </label>
                        {errors && errors.longitude &&
        <p style={{color:"red"}}>{errors.longitude}</p>}
                    </div>
                    </div>

                </div>
                <div className='description'>
                    <h2>Describe your place to guests</h2>
                    <p>"Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood"

                    </p>
                    <div className ='text-label'>
                        <textarea
                            type='text'
                            placeholder='Please write at least 30 characters'
                            onChange={updateDescription} />
                            {errors && errors.description &&
        <p style={{color:"red"}}>{errors.description}</p>}
                    </div>

                </div>

                <div className='name'>
                    <h2>Create a title for your spot</h2>
                    <p>"Catch guests attention with a spot title that highlights what makes your place special"</p>
                    <div className ='text-label'>
                        <label>
                            <input
                                type='text'
                                placeholder='Name of your spot'
                                onChange={updateName} />
                        </label>
                        {errors && errors.name &&
        <p style={{color:"red"}}>{errors.name}</p>}
                    </div>
                </div>

                <div className='price'>
                    <h2>Set a base price for your spot</h2>
                    <p>"Competitive pricing can help your listing stand out and rank higher in search results."</p>
                    <div className ='text-label'>
                        <input
                            type='number'
                            placeholder='Price per night (USD)'
                            onChange={updatePrice} />
                            {errors && errors.price &&
        <p style={{color:"red"}}>{errors.price}</p>}

                    </div>
                </div>
                <div className='pics'>
                    <h2>Liven up your spot with photos</h2>
                    <p>"Submit a link to at least one photo to publish your spot."</p>
                    <div>
                        <input type='text' placeholder='Preview Image Url' onChange={(e) => setPreviewImage(e.target.value)}></input>
                        <input type='text' placeholder='Image URL' onChange={(e) => setImg1(e.target.value)}></input>
                        <input type='text' placeholder='Image URL' onChange={(e) => setImg2(e.target.value)}></input>
                        <input type='text' placeholder='Image URL' onChange={(e) => setImg3(e.target.value)}></input>
                        <input type='text' placeholder='Image URL'></input>
                    </div>
                </div>
                <div className='buttons'>

                <button type='submit'>Create Spot</button>
                <button type='button'>Cancel</button>
                </div>
            </form>}
        </>





    )


}
export default CreateSpotForm