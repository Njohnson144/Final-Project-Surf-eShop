import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localStorage.service';
import './SignUpPage.css'

export default function SignUpPage() {



    return (
        <div className="login-signup">
            <h2 className='header'>Paddle Out!</h2>
            <br />


            <SignUpForm />
            <hr />
            <Link to="/login">
                <button className='login-button' type="button">Log In</button>
            </Link>
        </div>
    )
}

function SignUpForm() {

    const navigate = useNavigate();
    const http = useApi();
    const localStorageService = useLocalStorage();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [isEmailTaken, setIsEmailTaken] = useState(true);

    function attemptSignUp(e) {
        e.preventDefault()
        console.log('attempted sign up');
        http.createNewUser(user)
            .then(res => {
                const user = res.data.user;
                localStorageService.saveUser(user);
                navigate(`/`);
            }).catch(err => {
                console.error(err);
            });
    }
    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    }


    return (


        <form onSubmit={attemptSignUp}>

            <div className='submit-form'>
                {isEmailTaken && <div className="error-message"></div>}
                <label className='email-label'>Email:</label>
                <input type="text"
                    className={isEmailTaken ? 'email-taken' : ''}
                    name="email"
                    required
                    value={user.email}
                    onChange={handleChange} />
                <br />

                <label >Password:</label>
                <input type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange} />



            </div>
            <button className='submit-button' type="submit"
                disabled={!user.email || !user.password}>Sign Up</button>
        </form>

    )

}