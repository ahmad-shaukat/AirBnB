import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../../store/session";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";



const SignupFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [userName, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState({})

if (sessionUser) return <Redirect to ='/' />
const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        setErrors({})
        return dispatch(sessionActions.signup({
            userName,
            firstName,
            lastName,
            email,
            password
        })).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })
    }
   

    return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });

}

    return (

        <form onSubmit={onSubmit}>
            <div>
                <label>First Name: 
                <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>Last Name: 
                <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>Email: 
                <input type="email" name="firstName" onChange={(e) => setEmail(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>Password: 
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>Confrimed Password: 
                <input type="password" name="confirmPassword" onChange={(e) => setConfirmedPassword(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>Username: 
                <input type="text" name="userName" onChange={(e) => setUsername(e.target.value)}></input>
                </label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
export default SignupFormPage