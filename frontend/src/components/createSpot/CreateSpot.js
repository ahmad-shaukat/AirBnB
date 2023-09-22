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
    const [previewImage, setPreviewImage] = useState('')
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
            images: [previewImage, Img1, Img2, Img3]

        }

        let createdSpot = await dispatch(CreateSpot(spot)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }


    }

    return (
        <><div className='cre-spt-main-ctn'>

            <div className='cre-spt-hdg-ctn'>

                <p className='create-heading'>Create a New Spot</p>
            </div>
            {<form onSubmit={handleSubmit} className='create-form'>
                <div className='cre-spt-loc-main-ctn'>

                    <div className='location'>
                        <p className='cre-spt-des-hed'>Where's is your place located?</p>
                        <p className='cre-spt-des-sub-hed'>"Guests will only get your exact address once they booked a reservation"</p>
                        <div className='location-input-labels'>

                            <div className='cre-spt-country-text-label'>
                                <div className='cre-spt-inp-err-ctn'>

                                    <label for='cheese'>
                                        Country:
                                    </label>
                                    {errors && errors.country &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.country}</p>}
                                </div>
                                <input
                                    id="cheese"
                                    type='text'
                                    placeholder='Enter Country'
                                    onChange={updateCountry} />
                            </div>
                            <div className='cre-spt-address-text-label'>
                                <div className='cre-spt-inp-err-ctn'>
                                    <label>
                                        Street Address:
                                    </label>

                                    {errors && errors.address &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.address}</p>}
                                </div>
                                <input
                                    type='text'
                                    placeholder='Enter address'
                                    onChange={updateAddress} />
                            </div>
                            <div className='cre-spt-cty-ste'>

                                <div className='cre-spt-city-text-label'>
                                    <div className='cre-spt-inp-err-ctn'>

                                        <label>
                                            City:
                                        </label>
                                        {errors && errors.city &&
                                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.city}</p>}
                                    </div>
                                    <input
                                        type='text'
                                        className='cre-spt-city-ipt'
                                        placeholder='Enter City'
                                        onChange={updateCity} />
                                </div>
                                <div className='cre-spt-ste-text-label'>
                                    <div className='cre-spt-inp-err-ctn'>

                                        <label>State:
                                        </label>
                                        {errors && errors.state &&
                                            <p style={{ color: "red" }} className='state-err'>{errors.state}</p>}
                                    </div>

                                    <input
                                        type='text'
                                        className='cre-spt-ste-int'
                                        placeholder='Enter State'
                                        onChange={updateState} />


                                </div>
                            </div>
                            <div className='cre-spt-lng-lat'>

                                <div className='cre-spt-lat-text-label'>
                                    <label>Latitude(optional):
                                    </label>
                                    <input
                                        type='number'
                                        placeholder='Enter Latitude'
                                        onChange={updateLat} />
                                    {errors && errors.lat &&
                                        <p style={{ color: "red" }}>{errors.lat}</p>}
                                </div>
                                <div className='cre-spt-lng-text-label'>
                                    <label>Longitude(optional):
                                    </label>
                                    <input
                                        type='number'
                                        placeholder='Enter Longitude'
                                        onChange={updateLng} />

                                    {errors && errors.longitude &&
                                        <p style={{ color: "red" }}>{errors.longitude}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className='cre-spt-loc-des-div'></div> */}
                <div className='cre-spt-desc-main-ctn'>

                    <div className='cre-spt-description'>
                        <div className='cre-spt-des-hed-sub-hed'>

                            <p className='cre-spt-des-hed'>Describe your place to guests</p>
                            <p className='cre-spt-des-sub-hed'>"Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood"

                            </p>
                        </div>
                        <div className='text-label'>
                            <textarea
                                type='text'
                                className='cre-spt-des-text'
                                placeholder='Please write at least 30 characters'
                                onChange={updateDescription} />
                            {errors && errors.description &&
                                <p style={{ color: "red" }}>{errors.description}</p>}
                        </div>

                    </div>
                </div>
                {/* <div className='cre-spt-loc-des-div'></div> */}
                <div className='cre-spt-name-main-ctn'>

                    <div className='cre-spt-name'>
                        <div className='cre-spt-des-hed-sub-hed' >

                            <p className='cre-spt-des-hed'>Create a title for your spot</p>
                            <p className='cre-spt-des-sub-hed'>"Catch guests attention with a spot title that highlights what makes your place special"</p>
                        </div>
                        <div className='text-label'>
                            <div>
                                <input
                                    type='text'
                                    placeholder='Name of your spot'
                                    className='cre-spt-name-txt'
                                    onChange={updateName} />
                                {errors && errors.name &&
                                    <p style={{ color: "red" }}>{errors.name}</p>}
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className='cre-spt-loc-des-div'></div> */}
                <div className='cre-spt-prcice-main-ctn'>

                    <div className='cre-spt-price-text'>
                        <div className='cre-spt-des-hed-sub-hed' >
                            <p className='cre-spt-des-hed'>Set a base price for your spot</p>
                            <p className='cre-spt-des-sub-hed'>"Competitive pricing can help your listing stand out and rank higher in search results."</p>
                        </div>
                        <div className='cre-price-text-label'> <span>$</span>
                            <div>

                                <input
                                    type='number'
                                    placeholder='Price per night (USD)'
                                    className='cre-spt-amount-txt'
                                    onChange={updatePrice} />
                                {errors && errors.price &&
                                    <p style={{ color: "red" }}>{errors.price}</p>}
                            </div>

                        </div>
                    </div>
                </div>
                {/* <div className='cre-spt-loc-des-div'></div> */}
                <div className='cre-spt-practice-main-ctn'>

                <div className='cre-spt-pics'>
                    <div className='cre-spt-des-hed-sub-hed' >
                        <p className='cre-spt-des-hed'>Liven up your spot with photos</p>
                        <p className='cre-spt-des-sub-hed'>"Submit a link to at least one photo to publish your spot."</p>
                    </div>
                    <div className='cre-spt-img-lnk-ctn'>
                        <input type='text' placeholder='Preview Image Url' onChange={(e) => setPreviewImage(e.target.value)}></input>
                        <input type='text' placeholder='Image URL' onChange={(e) => setImg1(e.target.value)}></input>
                        <input type='text' placeholder='Image URL' onChange={(e) => setImg2(e.target.value)}></input>
                        <input type='text' placeholder='Image URL' onChange={(e) => setImg3(e.target.value)}></input>
                        <input type='text' placeholder='Image URL'></input>
                    </div>
                </div>
                </div>
                <div className='cre-spt-sub-buttons'>

                    <button className='create-submit-btn' type='submit'>Create Spot</button>
                    {/* <button type='button'>Cancel</button> */}
                </div>
            </form>}
        </div>
        </>





    )


}
export default CreateSpotForm