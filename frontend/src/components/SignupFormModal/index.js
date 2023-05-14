import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../../store/session";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './SignupFormPage.css'



const SignupFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()

    // if (sessionUser) return <Redirect to='/' />
    const onSubmit = (e) => {
        e.preventDefault();
        // setErrors([])
        if (password === confirmPassword) {
            setErrors({})
            return dispatch(sessionActions.signup({
                userName,
                firstName,
                lastName,
                email,
                password
            }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                (setErrors(data.errors))    
                }
                
                console.log (errors, '------signup-errors-----')
            })
        }


        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });

    }
    let formDisabled = false
    if ( userName === ''|| firstName===''|| lastName===''||email===''||  password===''||userName.length<4 || password.length<6 || password !== confirmPassword) formDisabled = true

    return (
    
    
    
    
    <>
    <div className="sgn-up-ctn">

            <ul>
                {Object.keys(errors).map((key) => (
                    <>
                    <div className="sgn-up-err-ctn">
                    <li key={key} className="sgn-up-err">{errors[key]}</li>

                    </div>
                    </>
                ))}
            </ul>
            <div className="sgn-up-form-ctn">

        <form onSubmit={onSubmit} className="sgn-up-form">
            <p className="sgn-frm-hdg">Sign Up</p>

            <div>
                <label>First Name:
                </label>
                    <input type="text" placeholder="Enter First Name" name="firstName" onChange={(e) => setFirstName(e.target.value)}></input>
                {/* {errors.firstName && <p>{errors.firstName}</p>} */}
            </div>
            <div>
                <label>Last Name:
                </label>
                    <input type="text" placeholder="Enter Last Name" name="lastName" onChange={(e) => setLastName(e.target.value)}></input>
                {/* {errors.lastName && <p>{errors.lastName}</p>} */}
            </div>
            <div>
                <label>Email:
                </label>
                    <input type="email" placeholder="Enter Email" name="firstName" onChange={(e) => setEmail(e.target.value)}></input>
                {/* {errors.email && <p>{errors.email}</p>} */}
            </div>
            <div>
                <label>Password:
                </label>
                    <input type="password" placeholder="Choose a Password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                {/* {errors.password && <p>{errors.password}</p>} */}
            </div>
            <div>
                <label>Confrimed Password:
                </label>
                    <input type="password" placeholder="Confirmed Password" name="confirmPassword" onChange={(e) => setConfirmedPassword(e.target.value)}></input>
                {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
            </div>
            <div>
                <label>Username:
                </label>
                    <input type="text" placeholder="Pick a username" name="userName" onChange={(e) => setUserName(e.target.value)}></input>
                {/* {errors.userName && <p>{errors.userName}</p>} */}
            </div>
            <div className="sgn-up-form-btn-ctn">
                <button type="submit" disabled={formDisabled} className="sgn-up-form-btn">Sign up</button>
            </div>
        </form>
            </div>
    </div>
    </>

    )
}
export default SignupFormPage