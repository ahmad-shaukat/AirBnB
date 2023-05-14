import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { EditSpot } from "../../store/spots"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
// import spot from "../../../../backend/db/models/spot"
import './editSpot.css'


const EditSpotForm = ({ spot, hideForm }) => {
    console.log (spot, '--------------this is spot')
    const dispatch = useDispatch()
    const history = useHistory()
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lng, setLng] = useState(spot.lng)
    const [lat, setLat] = useState(spot.lat)
    const [name, setName] = useState(spot.name)
    // const [previewImage, setPreviewImage] = useState(spot.previewImage)
    // const [Img1, setImg1] = useState('')
    // const [Img2, setImg2] = useState('')
    // const [Img3, setImg3] = useState('')
    // const [Img4, SetImg4] = useState(spot.Img3)
    const [errors, setErrors] = useState({})

    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)



    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateName = (e) => setName(e.target.value)

    const updateDescription = (e) => setDescription(e.target.value)

    const updatePrice = (e) => setPrice(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        // const errors = {};
        // if (!country.length) errors['country'] = 'Country is required'
        // if (!address.length) errors['address'] = 'Address is required'
        // if (!city.length) errors['city'] = 'City is required'
        // if (!state.length) errors['state'] = 'State is required'
        // if (description.length < 30) errors['description'] = 'Description needs a minimum of 30 Characters'
        // if (!name.length) errors['title'] = 'Name is required'
        // if (!price) errors['price'] = 'Price is required'

        // if (Object.values(errors).length) {
        //     setValidationErrors(errors)
        //     return alert('cannot submit')
        // }




        const payload = {
            ...spot,
            address,
            city,
            state,
            country,
            lng,
            lat,
            name,
            description,
            price,
           
        }
        let updatedSpot = await
            dispatch(EditSpot(payload, spot.id)).catch(async(res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors(data.errors)
                }
            })
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
        <div className='cre-spt-main-ctn'>

        <div className='cre-spt-hdg-ctn'>

            <p className='create-heading'>Update your spot</p>
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
                                value={country}
                                // placeholder='Enter Country'
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
                               value={address}
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
                                    value={city}
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
                                   value={state}
                                    onChange={updateState} />


                            </div>
                        </div>
                        <div className='cre-spt-lng-lat'>

                            <div className='cre-spt-lat-text-label'>
                                <label>Latitude(optional):
                                </label>
                                <input
                                    type='number'
                                   value={lat}
                                    onChange={updateLat} />
                                {errors && errors.lat &&
                                    <p style={{ color: "red" }}>{errors.lat}</p>}
                            </div>
                            <div className='cre-spt-lng-text-label'>
                                <label>Longitude(optional):
                                </label>
                                <input
                                    type='number'
                                    value={lng}
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
                          value={description}
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
                                value={name}
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
                                value={price}
                                className='cre-spt-amount-txt'
                                onChange={updatePrice} />
                            {errors && errors.price &&
                                <p style={{ color: "red" }}>{errors.price}</p>}
                        </div>

                    </div>
                </div>
            </div>
            {/* <div className='cre-spt-loc-des-div'></div> */}
            <div className='cre-upd-sub-buttons'>

                <button className='rev-upd-sub-btn' type='submit'>Update</button>
            <button type='button' onClick={handleCancelClick} className="cre-upd-can">Cancel</button>

                {/* <button type='button'>Cancel</button> */}
            </div>
        </form>}
    </div>
    </>
    )
}









export default EditSpotForm


// return (
//     <>
//         <h1>Update Spot</h1>
//         {<form onSubmit={handleSubmit}>


//             <div>
//                 <h2>Where's is your place located?</h2>
//                 <p>"Guests will only get your exact address once they booked a reservation"</p>
//             </div>
//             <div>
//                 <label>
//                     Country:
//                     <input
//                         type='text'
//                         value={country}
//                         onChange={updateCountry} />
//                 </label>
//                 {errors && errors.country &&
//                         <p style={{ color: "red" }}>{errors.country}</p>}
//             </div>

//             <div>
//                 <label>
//                     Street Address:
//                     <input
//                         type='text'
//                         value={address}

//                         onChange={updateAddress} />
//                 </label>
//                 {errors && errors.address &&
//     <p style={{color:"red"}}>{errors.address}</p>}
//             </div>
//             <div>
//                 <label>
//                     City:
//                     <input
//                         type='text'
//                         value={city}
//                         onChange={updateCity} />

//                 </label>
//                 {/* {errors && errors.city &&
//     <p style={{color:"red"}}>{errors.city}</p>} */}
//             </div>
//             <div>
//                 <label>State:
//                     <input
//                         type='text'
//                         value={state}
//                         onChange={updateState} />

//                 </label>
//                 {/* {errors && errors.state &&
//     <p style={{color:"red"}}>{errors.state}</p>} */}
//             </div>
//             <div>
//                 <label>Latitude(optional):
//                     <input
//                         type='number'
//                         value={lat}
//                         onChange={updateLat} />
//                 </label>
//                 {errors && errors.lat &&
//     <p style={{color:"red"}}>{errors.lat}</p>}
//             </div>
//             <div>
//                 <label>Longitude(optional):
//                     <input
//                         type='number'
//                         value={lng}
//                         onChange={updateLng} />

//                 </label>
//                 {errors && errors.longitude &&
//     <p style={{color:"red"}}>{errors.longitude}</p>}
//             </div>
//             <div>
//                 <h2>Describe your place to guests</h2>
//                 <p>"Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood"

//                 </p>
//                 <div>
//                     <textarea
//                         type='text'
//                         value={description}
                        
//                         onChange={updateDescription} />
//                     {errors && errors.description &&
//                         <p style={{ color: "red" }}>{errors.description}</p>}
//                 </div>
//             </div>
//             <div>
//                 <h2>Create a title for your spot</h2>
//                 <p>"Catch guests attention with a spot title that highlights what makes your place special"</p>
//                 <div>
//                     <label>
//                         <input
//                             type='text'
//                             value={name}
                           
//                             onChange={updateName} />
//                     </label>
//                     {errors && errors.name &&
//     <p style={{color:"red"}}>{errors.name}</p>}
//                 </div>
//             </div>
//             <div>
//                 <h2>Set a base price for your spot</h2>
//                 <p>"Competitive pricing can help your listing stand out and rank higher in search results."</p>
//                 <div>
//                     <input
//                         type='number'
//                         placeholder='Price per night (USD)'
//                         value={price}
//                         onChange={updatePrice} />
//                         {errors && errors.price &&
//     <p style={{color:"red"}}>{errors.price}</p>}

//                 </div>
//             </div>
       
//             <div>
//                 <h2>Liven up your spot with photos</h2>
//                 <p>"Submit a link to at least one photo to publish your spot."</p>
//                 <div>
//                     <input type='text' disabled={true}></input>
//                     <input type='text' disabled={true}></input>
//                     <input type='text'disabled={true}></input>
//                     <input type='text'disabled={true}></input>
//                 </div>
//             </div>
//             <button type='submit'>Update</button>
//             <button type='button' onClick={handleCancelClick}>Cancel</button>
//         </form>}
//     </>
// )