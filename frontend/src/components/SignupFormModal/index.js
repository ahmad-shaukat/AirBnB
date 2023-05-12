import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../../store/session";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";



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
                
                console.log (errors)
            })
        }


        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });

    }

    return (

        <form onSubmit={onSubmit}>
            {/* <ul>
                {Object.keys(errors).map((key) => (
                    <li key={key}>{errors[key]}</li>
                ))}
            </ul> */}

            <div>
                <label>First Name:
                    <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}></input>
                </label>
                {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div>
                <label>Last Name:
                    <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}></input>
                </label>
                {errors.lastName && <p>{errors.lastName}</p>}
            </div>
            <div>
                <label>Email:
                    <input type="email" name="firstName" onChange={(e) => setEmail(e.target.value)}></input>
                </label>
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <label>Confrimed Password:
                    <input type="password" name="confirmPassword" onChange={(e) => setConfirmedPassword(e.target.value)}></input>
                </label>
                {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
            </div>
            <div>
                <label>Username:
                    <input type="text" name="userName" onChange={(e) => setUserName(e.target.value)}></input>
                </label>
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
export default SignupFormPage